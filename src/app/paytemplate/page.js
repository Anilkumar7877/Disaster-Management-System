// pages/donate-options.js
"use client"
import Link from 'next/link';

const DonateOptions = () => {
    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center text-black  bg-[url('https://img.freepik.com/premium-photo/child-parent-hands-holding-money-jar-donation-saving-family-finance-plan-concept_49149-1163.jpg?w=996')]  text-white  bg-cover bg-center min-h-screen backdrop-blur-3xl">
            <div className='overlay'></div>
            <h1 className="text-4xl font-bold mb-8 z-50">Donation Options</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 z-50 opacity-70">

                {/* PhonePe */}
                <Link href="/generateqr">
                    <div className="p-6 bg-white text-black rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer">
                        <h3 className="font-semibold text-xl">Donate via QR Code</h3>
                        <p className="mt-2 text-gray-700">Support us by donating via QR.</p>
                        <span className="mt-4 text-blue-600">Click</span>
                    </div>
                </Link>

                {/* UPI ID */}
                <Link href="/upiid">
                    <div className="p-6 bg-white text-black rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer">
                        <h3 className="font-semibold text-xl">Donate via UPI ID</h3>
                        <p className="mt-2 text-gray-700">Use your UPI ID to make a donation.</p>
                        <span className="mt-4 text-blue-600">Click</span>
                    </div>
                </Link>

                {/* Phone Number */}
                <Link href="/phonenumber">
                    <div className="p-6 bg-white text-black rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer">
                        <h3 className="font-semibold text-xl">Donate via Phone Number</h3>
                        <p className="mt-2 text-gray-700">Donate directly using your phone number.</p>
                        <span className="mt-4 text-blue-600">Click</span>
                    </div>
                </Link>

                {/* Net Banking */}
                {/* <Link href="/generateqr">
                    <div className="p-6 bg-white text-black rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer">
                        <h3 className="font-semibold text-xl">Donate via Net Banking</h3>
                        <p className="mt-2 text-gray-700">Make a donation through net banking.</p>
                        <span className="mt-4 text-blue-600">Click</span>
                    </div>
                </Link> */}
            </div>
        </div>
    );
};

export default DonateOptions;
