"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import styles from './page.module.css'; // Import CSS module
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="bg-blue-300">
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="font-bold">HopeBridge Crisis Management</h1>
          <h1 className="font-bold">Portal</h1>

          <p className="text-5xl hero-p">A Robust Platform for Disaster Management</p>
        </div>
      </section>

      {/* <div className="notification-section">
        <h2>Event Notifications</h2>
        <div className="notification-scroll">
          <div className="notification-card volcano">
            <span className="type">VOLCANO</span>
            <h3>Great Sitkin</h3>
            <p className="status">ORANGE - WATCH</p>
            <p className="date">2024-09-21 20:35:54 UTC</p>
          </div>
          <div className="notification-card volcano">
            <span className="type">VOLCANO</span>
            <h3>Kilauea</h3>
            <p className="status">ORANGE - WATCH</p>
            <p className="date">2024-09-21 19:51:54 UTC</p>
          </div>
          <div className="notification-card earthquake">
            <span className="type">EARTHQUAKE</span>
            <h3>Magnitude 5.1</h3>
            <p className="details">234 km WSW of Anaktuvuk Pass, Alaska</p>
            <p className="date">2024-09-21 20:14:22 UTC</p>
          </div>
          <div className="notification-card earthquake">
            <span className="type">EARTHQUAKE</span>
            <h3>Magnitude 6.3</h3>
            <p className="details">285 km NE of Sapporo, Hokkaido, Japan</p>
            <p className="date">2024-09-21 19:09:16 UTC</p>
          </div>
          <div className="notification-card earthquake">
            <span className="type">EARTHQUAKE</span>
            <h3>Magnitude 6.3</h3>
            <p className="details">272 km WNW of Avacha Volcano, Russia</p>
            <p className="date">2024-09-21 18:58:14 UTC</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}


