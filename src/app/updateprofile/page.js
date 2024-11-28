"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const updateprofile = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        // Fetch user data from the backend
        const fetchUserData = async () => {
            if (session && session.user) {
                try {
                    const response = await axios.get(`/api/users?email=${session.user.email}`);
                    
                    setUser({
                        name: response.data.data.name,
                        email: response.data.data.email,
                        phone: response.data.data.phone || "Phone not available",  // Fetch phone number
                        admin: response.data.data.admin,
                    });
                    console.log("User data fetched:", response.data.data);
                    // await fetchAvatar();
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        if (session && session.user) {
            // setUser({
            //     name: session.user.name || "",
            //     email: session.user.email || "",
            //     phone: "Fetching phone...", // Initial placeholder until fetched
            // });
            fetchUserData();
            router.refresh();
            // fetchAvatar();
        }
    }, [session]);

    const [isEditVisible, setEditVisible] = useState(false);
    const [isOverlayActive, setOverlayActive] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const isSaveDisabled = !isEmailValid || !isPhoneValid || !isUsernameValid;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));

        if (name === "email") {
            setIsEmailValid(validateEmail(value));
        }

        if (name === "phone") {
            setIsPhoneValid(validatePhone(value));
        }

        if (name === "name") {
            setIsUsernameValid(value.trim() !== "");
        }
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();

        const { email } = session.user; // Get the user's email from the session
        console.log("Saving user data:", { email, name: user.name, phone: user.phone });

        try {
            const response = await axios.put("/api/users", {
                email: email, // User's email to find the record
                name: user.name, // New name to update
                phone: user.phone, // New phone to update
            });

            console.log("Response from API:", response.data);

            if (response.status === 200) {
                alert("Profile updated successfully");
                setUser({
                    ...user,
                    name: user.name, // Update the user state with the new name
                    phone: user.phone, // Update the user state with the new phone
                });
                router.refresh();
                router.push("/profile"); // Redirect to profile page to show the updated data
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        }
    };

    return (
        <>
            <div className="flex flex-col rounded-lg w-96 h-96 items-center mt-10 absolute top-32 left-1/2 shadow-2xl">
                <div className="bg-white text-black relative flex h-96 py-6 px-4 w-full border border-gray-300 shadow-lg rounded-lg">
                    <div className="pb-2 w-full relative justify-center flex flex-col items-center">
                        <form className="space-y-4 w-full absolute left-0 flex flex-col justify-start">
                            <div>
                                <label className="block text-gray-700 font-bold">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                                {!isUsernameValid && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Username cannot be empty.
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                                {!isEmailValid && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Please enter a valid email address.
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                                {!isPhoneValid && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Please enter a valid 10-digit phone number.
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={handleSaveClick}
                                type="submit"
                                className={`m-auto w-24 px-2 py-2 mt-4 rounded-lg bg-blue-900 text-white ${isSaveDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={isSaveDisabled}
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default updateprofile;
