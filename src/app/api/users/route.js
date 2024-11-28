import { createUserWithAccount, getUserByEmail, updateUserByEmail } from "@/utils/user"; // Import user-related utilities
import bcrypt from 'bcryptjs'; // Import bcryptjs instead of bcrypt
import { NextResponse } from "next/server";

// GET method for fetching user data by email
export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        // Check if the email is provided
        if (!email) {
            return NextResponse.json({ message: "Email is required." }, { status: 400 });
        }

        // Fetch the user by email
        const user = await getUserByEmail(email);
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        return NextResponse.json({
            message: "User fetched successfully",
            data: user,
        }, { status: 200 });

    } catch (err) {
        console.error("Error fetching user:", err); // Log error details
        return NextResponse.json({
            message: "Error fetching user",
            error: err.message || "An unexpected error occurred",
        }, { status: 500 });
    }
}

// POST method for user creation
export const POST = async (req, res) => {
    try {
        const { name, email, password, phone } = await req.json();  // Added phone

        // Check if the email already exists in the database
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({
                message: "Email is already in use.",
            }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Salt round of 10

        // Create the new user if the email doesn't exist
        const newUser = await createUserWithAccount({
            name,
            email,
            password: hashedPassword, // Use the hashed password
            phone,  // Include phone in user creation
        });

        return NextResponse.json({
            message: "User created",
            data: {
                ...newUser
            }
        }, { status: 201 })

    } catch (err) {
        return NextResponse.json({
            message: "Error",
            err
        }, { status: 500 });
    }
}

// PUT method for updating user information
export const PUT = async (req, res) => {
    try {
        const { email, name, phone, bookmark } = await req.json();  // Get email, name, phone, and bookmark
        console.log("Incoming data for update:", { email, name, phone, bookmark }); // Log incoming data

        // Check if email is provided
        if (!email) {
            return NextResponse.json({ message: "Email is required." }, { status: 400 });
        }

        // Fetch the current user by email
        const user = await getUserByEmail(email);
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        // Prepare the update data
        const updateData = {};
        if (name) updateData.name = name;  // If name is provided, update it
        if (phone) updateData.phone = phone;  // If phone is provided, update it

        // Handle bookmarking logic (add or remove bookmark)
        if (bookmark) {
            const isBookmarked = user.bookmarks.includes(bookmark);

            if (!isBookmarked) {
                // Add bookmark if it's not already present
                updateData.bookmarks = [...user.bookmarks, bookmark];
            } else {
                // Remove bookmark if it already exists
                updateData.bookmarks = user.bookmarks.filter(b => b !== bookmark);
            }
        }

        // Update user information (name, phone, and/or bookmarks)
        const updatedUser = await updateUserByEmail(email, updateData);

        console.log("Updated user:", updatedUser); // Log updated user details

        return NextResponse.json({
            message: "User updated successfully",
            data: updatedUser,
        }, { status: 200 });

    } catch (err) {
        console.error("Error updating user:", err); // Log error details
        return NextResponse.json({
            message: "Error updating user",
            error: err.message || "An unexpected error occurred",
        }, { status: 500 });
    }
}

export const DELETE = async (req, res) => {
    try {
        const { email, newsArticleID } = await req.json();  // Identify the user and the article to be removed

        if (!email || !newsArticleID) {
            return NextResponse.json({ message: "Email and article ID are required." }, { status: 400 });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        // Remove the article from the user's bookmarks array
        const updatedBookmarks = user.bookmarks.filter(bookmark => bookmark.newsArticleID !== newsArticleID);

        const updatedUser = await updateUserByEmail(email, {
            bookmarks: updatedBookmarks
        });

        return NextResponse.json({ message: "Bookmark removed successfully", data: updatedUser }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: "Error removing bookmark", error: err.message }, { status: 500 });
    }
};
