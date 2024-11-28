"use client"
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
    });
    
    const fetchUserData = async (email) => {
        try {
            const response = await axios.get(`/api/users?email=${email}`);
            return {
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone || "1234567890",
            };
        } catch (error) {
            console.error("Error fetching user data:", error);
            return { error: "Error fetching user data" };
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            const email = "user@example.com"; // Get the email as needed
            const userData = await fetchUserData(email);
            setUser(userData); // Update state with fetched data
        };

        getUserData(); // Call the function to fetch data
    }, []); // Empty dependency array means it runs once on mount

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.phone}</p>
        </div>
    );
};

export default Profile;
