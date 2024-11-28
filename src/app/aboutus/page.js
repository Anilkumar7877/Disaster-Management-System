import React from 'react';

const aboutus = () => {
    return (
        <div className="flex justify-center items-center bg-[url('https://www.shutterstock.com/shutterstock/photos/2284126663/display_1500/stock-photo-data-science-and-big-data-technology-scientist-computing-analysing-and-visualizing-complex-data-2284126663.jpg')]  text-white  bg-cover bg-center min-h-screen backdrop-blur-3xl">
            <div className='overlay'></div>
            <section className="py-12 z-50 relative top-1/4 flex flex-col gap-4 opacity-80">
                <div className='text-5xl text-white flex justify-center font-bold'>ABOUT US</div>
                <div className="w-[90%] mx-auto z-50">
                    <div className="bg-blue-100 p-6 shadow-lg rounded-lg">
                        <h3 className="text-xl text-black mb-7 font-bold">Introduction</h3>
                        <p className=" text-black">
                            The emergence of our platform is a result of the growing need for real-time disaster information and support. Recognizing the critical role of technology in disaster relief, we have created a platform that provides live earthquake location updates and connects those in need with relief efforts and donations. Our platform is designed to make information accessible, while also providing a way for people to directly support disaster victims through donations.
                        </p>
                        <h4 className="text-lg text-black mt-6 font-bold">Evolution of Our Platform</h4>
                        <p className=" text-black">
                            In response to the increasing frequency of natural disasters and their devastating impact, our platform was developed with the mission to connect real-time data and live location tracking with relief efforts. By integrating donations directly into the platform, we ensure that help reaches the affected areas swiftly and effectively. Our goal is to empower individuals, organizations, and relief teams to work together in reducing the impact of earthquakes and providing timely support to those who need it most.
                        </p>
                        <h4 className="text-lg text-black mt-6 font-bold">Vision</h4>
                        <p className=" text-black">
                            "To create a connected, resilient community by providing real-time earthquake updates, facilitating disaster relief, and empowering people to make a difference through donations."
                        </p>
                        <h5 className="text-md text-black mt-5 font-bold">Functions and Responsibilities</h5>
                        <ul className="ml-6 list-disc">
                            <li className=" text-black">Provide live earthquake location updates.</li>
                            <li className=" text-black">Facilitate donations to support disaster victims and relief efforts.</li>
                            <li className=" text-black">Coordinate with relief teams to ensure timely and accurate information is delivered to those on the ground.</li>
                            <li className=" text-black">Offer a platform for NGOs, individuals, and donors to collaborate on relief efforts.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default aboutus;
