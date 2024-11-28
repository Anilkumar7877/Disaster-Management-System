import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';

// Create user with account and phone number
export async function createUserWithAccount({ name, email, password, phone }) {
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                phone,  // Include phone number in the user creation
                accounts: {
                    create: {
                        type: 'credentials',
                        provider: 'email',
                        providerAccountId: uuidv4(),
                    }
                },
                userid: uuidv4(),  // Add a unique user ID
            },
            include: {
                accounts: true,
            }
        });
        return newUser;  // Return the newly created user
    } catch (error) {
        console.error('Error creating user with account: ', error);
        throw error;
    }
}

// Get user by email (including phone)
export async function getUserByEmail(email) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        console.error('Error getting user by email: ', error);
        throw error;
    }
}

// Update user by email (including phone)
export async function updateUserByEmail(email, data) {
    try {
        console.log("Updating user with email:", email, "and data:", data);  // Log email and data
        return await prisma.user.update({
            where: { email: email },  // Look for user by email
            data: data,  // Update with provided data (name, email, phone)
        });
    } catch (error) {
        console.error("Error updating user in database:", error);  // Log any errors
        throw error;  // Re-throw the error for handling in the API route
    }
}
