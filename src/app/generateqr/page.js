// pages/generateqr.js
"use client"
import Image from 'next/image';

const GenerateQR = () => {
    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4 text-black">Scan to Donate</h1>
            <div>
                <Image
                    src="/Gpay.jpg" // Ensure this image is in the `public` folder
                    alt="QR Code for Google Pay"
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default GenerateQR;
