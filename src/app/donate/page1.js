"use client"

import React from 'react';

const MyComponent = () => {
    return (
        <div className='donatepage'>
    <header class="header-style">
        <div class="container-style">
            {/* <!-- Logo and Title --> */}
            <div class="logo-title-style">
                <img src="https://media.istockphoto.com/id/1265111441/vector/circle-swoosh-with-hand-care-inside.jpg?s=612x612&w=0&k=20&c=qmcwdMKI1ZLF3djInsklBLkZPYPIr-X6se75BWfum7w=" alt="Logo" class="logo-img"></img>
                <h1 class="title-style">Indian Red Cross</h1>
            </div>

            {/* <!-- Navigation Menu --> */}
            <nav>
                <ul class="nav-list-style">
                    {/* <!-- Dropdown for Donate --> */}
                    <li class="dropdown-container">
                        <a href="#" class="dropdown-link">Donate Online</a>
                        {/* <!-- Dropdown menu --> */}
                        <ul class="dropdown-menu-style">
                            <li><a href="#" class="dropdown-item">Through QR</a></li>
                            <li><a href="#" class="dropdown-item">Through UPI ID</a></li>
                            <li><a href="#" class="dropdown-item">Through Phone Number</a></li>
                            <li><a href="#" class="dropdown-item">Through Net Banking</a></li>
                        </ul>
                    </li>
                    <li><a href="#" class="nav-item">Give Blood</a></li>
                    <li><a href="#" class="nav-item">Training & Certification</a></li>
                </ul>
            </nav>
        </div>
    </header>

    {/* <!-- Banner Section with Image and Overlay --> */}
    <section class="banner-style" style={{ backgroundImage: "url('https://www.redcross.org/content/dam/redcross/donations/ways-to-donate/your-gift-matters-/HurrIanFA23_hug_id13376-213_1348x500.jpg.transform/1288/q70/feature/image.jpeg')" }}>
        <div class="overlay-style"></div> 
        <div class="banner-content">
            <h2 class="banner-title">Disaster Relief</h2>
            <p class="banner-text">All day, every day, wherever someone needs us.</p>
        </div>
    </section>

    {/* <!-- Footer --> */}
    {/* <footer class="footer-style">
        <p>&copy; 2024 Indian Red Cross. All rights reserved.</p>
    </footer> */}
</div>



    );
};

export default MyComponent;