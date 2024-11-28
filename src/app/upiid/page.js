"use client"; 
import React, { useEffect } from 'react';

const UpiId = () => {
  // Function to get query parameters from the URL
  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  useEffect(() => {
    // Get UPI IDs from the URL
    const upi1 = getQueryParam('upi1') || 'mayankpal732005@okicici'; // Default value if upi1 is not provided
    const upi2 = getQueryParam('upi2') || '7052415580@ybl'; // Default value if upi2 is not provided

    // Display the UPI IDs on the page
    document.getElementById('upi1').textContent = `UPI ID (Google Pay): ${upi1}`;
    document.getElementById('upi2').textContent = `UPI ID (PhonePe): ${upi2}`;
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="text-center bg-white p-12 rounded-3xl shadow-lg w-3/4 max-w-lg">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Donate via UPI</h1>
        <p id="upi1" className="text-xl mb-4 text-gray-800"></p>
        <p id="upi2" className="text-xl text-gray-800"></p>
      </div>
    </div>
  );
};

export default UpiId;
