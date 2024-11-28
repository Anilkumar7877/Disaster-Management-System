"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Profile = () => {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    // useEffect(() => {
    //     router.refresh();
    // }, [])
    
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        admin: false,
    });
    const [avatarUrl, setAvatarUrl] = useState("");
    const [updatedName, setupdatedName] = useState(session?.user?.name);
    useEffect(() => {
        // Fetch user data from the backend
        // let a;
        const fetchUserData = async () => {
            if (session && session.user) {
                try {
                    const response = await axios.get(`/api/users?email=${session.user.email}`);
                    console.log(session);
                    setUser({
                        name: response.data.data.name,
                        email: response.data.data.email,
                        phone: response.data.data.phone || "Phone not available",  // Fetch phone number
                        admin: response.data.data.admin,
                    });
                    // await update();
                    console.log("User data fetched:", response.data.data);
                    // a=response.data.data.name;
                    // setupdatedName(response.data.data.name);
                    await fetchAvatar(response.data.data.name);
                    // return response.data.data;
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        // console.log("the a is given as ",a);
        // Fetch avatar image
        const fetchAvatar = async (e) => {
            console.log("updatedname is",updatedName);
            console.log("session?.user?.name",session?.user?.name);
            if (e) {
                const name = encodeURIComponent(e); // Ensure the name is URL-safe
                const response = await fetch(`https://ui-avatars.com/api/?name=${e}`);
                if (response.ok) {
                    const imageUrl = response.url; // This will be the image URL
                    setAvatarUrl(imageUrl);
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
            // router.refresh();
            fetchAvatar();
        }
    }, [session]);

    const handleEditClick = () => {
        router.push("/updateprofile");
        router.refresh();
    };

    const handleChangeProfilePicture = () => {
        alert("Change Profile Picture clicked!");
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) { 
        return <p>No session found</p>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex w-full h-[80vh] border-gray-300 shadow-lg rounded-lg">
                <div className="w-full p-6 flex items-center justify-center relative bg-[url('https://img.freepik.com/premium-vector/monochrome-wave-pattern-wavy-background-hand-drawn-lines-hair-texture-doodle-design-line-art_594089-2681.jpg')]  text-white  bg-cover bg-center min-h-screen backdrop-blur-sm">
                    <div className='overlay'></div>
                    <div className="w-2/3 flex flex-col items-center justify-center z-50">
                        <img
                            src={avatarUrl} // Display the fetched avatar
                            alt="User Avatar"
                            className="rounded-full w-80 h-80 border-4 border-black mb-4"
                        />
                        <div className="flex justify-center z-50">
                            {/* <button
                                onClick={handleChangeProfilePicture}
                                className="right-16 px-3 py-1 text-sm bg-blue-900 text-white rounded-lg"
                            >
                                Change Picture
                            </button> */}
                        </div>
                    </div>
                    <div className="w-2/3 flex flex-col items-start z-50">
                        <h1 className="text-9xl font-bold mt-2 text-black flex items-center gap-2">{user.name}
                            {user.admin && (
                                <span className="bg-yellow-500 text-black text-xl rounded-full px-4 py-1 font-mono flex items-center">
                                    admin
                                </span>
                            )}
                        </h1>
                        <p className="text-lg text-black">{user.email}</p>
                        <p className="text-lg text-black">{user.phone}</p>
                        <p className="text-base text-white mt-2 max-w-md text-center">
                            {/* Web Developer and Tech Enthusiast */}
                        </p>

                        <button
                            onClick={handleEditClick}
                            className="w-24 px-2 py-1 mt-4 rounded-lg bg-blue-900 text-white"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
