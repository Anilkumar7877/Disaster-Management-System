"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const GiveBlood = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [donations, setDonations] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        bloodType: "",
        phone: "",
        email: "",
    });

    const [user, setUser] = useState({
        name: "",
        admin: false,
    });

    const fetchDonations = async () => {
        try {
            const response = await axios.get("/api/blooddonation");
            setDonations(response.data.data);
        } catch (error) {
            console.error("Error fetching donations:", error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (session && session.user) {
                try {
                    const response = await axios.get(`/api/users?email=${session.user.email}`);
                    setUser({
                        name: response.data.data.name,
                        admin: response.data.data.admin,
                    });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchDonations();

        if (session && session.user) {
            setUser({
                name: session.user.name || "",
            });
            fetchUserData();
        }
        router.refresh();
    }, [session]);

    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/blooddonation", formData);

            if (response.status !== 201) {
                throw new Error(response.data.error || "Failed to submit the form");
            }

            setSuccessMessage("Thank you for your donation!");
            setFormData({ name: "", age: "", gender: "", bloodType: "", phone: "", email: "" });
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was a problem submitting the form: " + error.message);
        }
    };

    if (user.admin) {
        return (
            <div className="w-screen flex justify-center items-center min-h-screen bg-[url('https://media.assettype.com/thequint%2F2024-06%2F832e336a-0b61-49c4-95a6-f192847c6269%2FHero_image___Garima.png?auto=format%2Ccompress&fmt=webp&width=440&w=1200')] bg-cover bg-center backdrop-blur-lg bg-opacity-90">
                {/* <div className='overlay'></div> */}
                <div className=" my-6 bg-white p-10 rounded-2xl shadow-lg max-w-6xl w-11/12 text-black z-50 opacity-80">
                    <h1 className="text-3xl mb-8">Blood Donation Registrations</h1>
                    {/* Table to display donation data */}
                    <table className="w-full table-auto border-collapse rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4 text-left border-b-2 border-gray-300">Name</th>
                                <th className="p-4 text-left border-b-2 border-gray-300">Age</th>
                                <th className="p-4 text-left border-b-2 border-gray-300">Gender</th>
                                <th className="p-4 text-left border-b-2 border-gray-300">Blood Type</th>
                                <th className="p-4 text-left border-b-2 border-gray-300">Phone</th>
                                <th className="p-4 text-left border-b-2 border-gray-300">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((donation) => (
                                <tr
                                    key={donation.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-4 border-b border-gray-200">{donation.name}</td>
                                    <td className="p-4 border-b border-gray-200">{donation.age}</td>
                                    <td className="p-4 border-b border-gray-200">{donation.gender}</td>
                                    <td className="p-4 border-b border-gray-200">{donation.bloodType}</td>
                                    <td className="p-4 border-b border-gray-200">{donation.phone}</td>
                                    <td className="p-4 border-b border-gray-200">{donation.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen flex justify-center items-center min-h-screen bg-blue-100  bg-[url('https://media.assettype.com/thequint%2F2024-06%2F832e336a-0b61-49c4-95a6-f192847c6269%2FHero_image___Garima.png?auto=format%2Ccompress&fmt=webp&width=440&w=1200')] bg-cover bg-center backdrop-blur-lg bg-opacity-90">
            {/* <div className='overlay'></div> */}
            <div className= " my-6 bg-blue-100 p-10 rounded-2xl shadow-lg max-w-md w-11/12 text-center text-black z-50 opacity-95 ">
                <h1 className="text-3xl mb-8">Blood Donation Form</h1>

                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                <form id="donationForm" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="text-lg block text-left mt-4">Full Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 mt-2 border border-gray-300 rounded-md" />

                    <label htmlFor="age" className="text-lg block text-left mt-4">Age:</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required className="w-full p-2 mt-2 border border-gray-300 rounded-md" />

                    <label htmlFor="gender" className="text-lg block text-left mt-4">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 mt-2 border border-gray-300 rounded-md">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="bloodType" className="text-lg block text-left mt-4">Blood Type:</label>
                    <select id="bloodType" name="bloodType" value={formData.bloodType} onChange={handleChange} required className="w-full p-2 mt-2 border border-gray-300 rounded-md">
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>

                    <label htmlFor="phone" className="text-lg block text-left mt-4">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 mt-2 border border-gray-300 rounded-md" />

                    <label htmlFor="email" className="text-lg block text-left mt-4">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 mt-2 border border-gray-300 rounded-md" />

                    <button type="submit" className="mt-6 px-6 py-3 bg-red-500 text-white rounded-md text-lg hover:bg-red-600">Submit Donation</button>
                </form>
            </div>
        </div>
    );
};

export default GiveBlood;
