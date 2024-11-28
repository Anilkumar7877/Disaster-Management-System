"use client";
import React from 'react';
import Link from 'next/link';

const backgroundImage = "https://www.redcross.org/content/dam/redcross/donations/ways-to-donate/your-gift-matters-/HurrIanFA23_hug_id13376-213_1348x500.jpg.transform/1288/q70/feature/image.jpeg";

const DonatePage = () => {
    return (
        <div className="relative min-h-screen text-blue-100 flex flex-col">
            {/* Background Image with Blur */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat filter opacity-1"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            {/* Overlay Content */}
            <div className="relative z-10 flex flex-col min-h-screen bg-black bg-opacity-50">
                {/* Main Content */}
                <main className="flex items-center justify-center min-h-screen container mx-auto text-center">
                    <div className='flex flex-col gap-28'>
                        <div>
                            <h2 className="text-6xl font-bold">Disaster Relief</h2>
                            <p className="text-2xl mt-2">All day, every day, wherever someone needs us.</p>
                        </div>

                        {/* Template Buttons with Card Style */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">

                            {/* Donate Money Section */}
                            <Link href="/paytemplate" passHref>
                                <div className="p-6 bg-white text-black rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer">
                                    <h2 className="font-bold text-xl">Donate Money</h2>
                                    <p className="mt-2  text-gray-700">Support us by donating money to help fund our operations.</p>
                                    <span className="mt-4 inline-block text-blue-600">Click to see options</span>
                                </div>
                            </Link>

                            {/* Give Blood Section */}
                            <Link href="/giveblood" passHref>
                                <div className="p-6 bg-white text-black rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer">
                                    <h3 className="font-bold text-xl">Donate Blood</h3>
                                    <p className="mt-2 text-gray-700">Find out how you can help by giving blood.</p>
                                    <span className="mt-4 inline-block text-blue-600">Click</span>
                                </div>
                            </Link>

                            {/* Training & Certification Section */}
                            <Link href="/trainingcert" passHref>
                                <div className="p-6 bg-white text-black rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer">
                                    <h3 className="font-semibold text-xl">Training & Certification</h3>
                                    <p className="mt-2 text-gray-700">Enroll in our training and certification programs.</p>
                                    <span className="mt-4 inline-block text-blue-600">Click</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DonatePage;
