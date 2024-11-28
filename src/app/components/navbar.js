"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react";
import React from 'react'
import Link from "next/link"
import { useRouter } from "next/navigation";
import axios from "axios";

const navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };
  const [avatarUrl, setAvatarUrl] = useState("");
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };
  const [user, setUser] = useState({
    name: "",
    // email: "",
    // phone: "",
    // admin: false,
  });

  useEffect(() => {
    router.refresh();
  }, [])


  useEffect(() => {
    // window.reload();
  }, []);
  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      if (session && session.user) {
        try {
          const response = await axios.get(`/api/users?email=${session.user.email}`);

          setUser({
            name: response.data.data.name,
            // email: response.data.data.email,
            // phone: response.data.data.phone || "Phone not available",  // Fetch phone number
            // admin: response.data.data.admin,
          });
          console.log("User data fetched in the navbar:", response.data.data);
          // console.log("User data fetched in the navbar:", response.data.data.name);
          await fetchAvatar(response.data.data.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    // Fetch avatar image
    const fetchAvatar = async (e) => {
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
      setUser({
        name: session.user.name || "",
        // email: session.user.email || "",
        // phone: "Fetching phone...", // Initial placeholder until fetched
      });
      fetchUserData();
      fetchAvatar();
    }
    router.refresh();
  }, [session]);

  return (
    <div className="w-full">
      <div className='bg-blue-900 text-white h-16 flex items-center justify-center w-full gap-56'>

        <div className="logo-container w-60 flex items-center justify-center ml-5">

          <div className="flex items-center justify-center w-60"><img
            src="INGS.png"
            alt="News logo"
            className="inline-block h-9 w-9 ml-2 mr-1 rounded-full"
          />
            <h2 className="text-4xl font-bold">HCMP</h2></div>
          <div className="flex justify-center">Science for a Changing World</div>
        </div>
        <nav className="w-3/4 flex gap-10">
          <ul className="container flex gap-2">

            <li className="item">
              <Link href="/">Home</Link>
            </li>

            {/* <!-- Dashboard Link --> */}
            <li className="item">
              <Link href="/dashboard">Dashboard</Link>
            </li>

            {/* <!-- Photo Gallery Link --> */}
            <li className="item">
              <Link href="/photogallery">Photo Gallery</Link>
            </li>

            {/* <!-- Contact Us Link --> */}
            <li className="item">
              <Link href="/contactus">Contact Us</Link>
            </li>

            {/* <!-- About Us Link --> */}
            <li className="item">
              <Link href="/aboutus">About Us</Link>
            </li>

            {/* <!-- News Link --> */}
            <li className="item">
              <Link href="/news">News</Link>
            </li>

            {/* <!-- Donate Link --> */}
            <li className="item">
              <Link href="/donate">Donate</Link>
            </li>

            {/* <li className="item">
                <Link href="/login">Login</Link>
                </li> */}

            {status !== "authenticated" ? (
              <>
                <Link href="/login"><button className="item signinoutbtn" onClick={handleLogin}>Log In</button></Link>
              </>
            ) : (
              <div className="flex items-center gap-5">
                {/* {console.log(session.user.image)} */}
                <div className="">
                  <Link href="/profile">
                    <div className="profilepic rounded-full bg-white shadow-md overflow-hidden flex items-center" >
                      <img src={avatarUrl} width={38} className="" alt="profilepic" />
                    </div>
                  </Link>
                </div>
                {/* <p className="item" >Email: {session.user.email}</p> */}
                <Link href="/"><button className="item signinoutbtn" onClick={handleLogout}>Sign out</button></Link>
              </div>
            )}

            {/* <!-- Search Bar --> */}
            {/* <form className="search-bar" action="/search" method="get">
              <input type="text" placeholder="Search..." name="query"></input>
              <button type="submit">Search</button>
            </form> */}
          </ul>
        </nav>

      </div>
    </div>
  )
}

export default navbar
