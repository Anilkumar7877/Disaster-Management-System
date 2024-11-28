import React from 'react';

const training = () => {
    return (
        <div className="w-screen flex justify-center items-center min-h-screen bg-[url('https://www.shutterstock.com/image-photo/business-work-assessment-certificate-concept-600nw-2370422129.jpg')] bg-cover bg-center ">
            <div class="my-6 bg-white text-black p-16 rounded-2xl shadow-lg max-w-screen-lg w-full text-center overflow-y-auto h-screen opacity-80">
                <h1 class="text-4xl mb-4">Training & Certification Programs</h1>
                <p class="text-xl mb-6">Join our various training and certification programs to enhance your skills and contribute to disaster relief efforts.</p>

                <h2 class="text-2xl my-6 font-bold">Available Programs:</h2>
                <ul class="text-left list-disc ml-6 text-xl space-y-4">
                    <li>
                        <strong  className='xl'>First Aid Training:</strong >
                        <p>Learn the basics of first aid, CPR, and emergency response techniques.</p>
                    </li>
                    <li>
                        <strong  className='xl'>Disaster Management Training:</strong >
                        <p>Understand the principles of disaster management and how to respond effectively.</p>
                    </li>
                    <li>
                        <strong  className='xl'>Community Emergency Response Team (CERT):</strong >
                        <p>Train to become part of a local emergency response team and help your community in times of need.</p>
                    </li>
                    <li>
                        <strong  className='xl'>Psychological First Aid:</strong>
                        <p>Learn how to provide emotional support and assistance during crises.</p>
                    </li>
                </ul>

                <h2 class="text-2xl my-6 font-bold">Certification:</h2>
                <p class="text-xl mb-6">Upon successful completion of any training program, participants will receive a certification that can be beneficial for personal development and career advancement.</p>

                <h2 class="text-2xl my-6 font-bold">Registration:</h2>
                <p class="text-xl">For more information or to register, please contact us at <a href="mailto:info@indianredcross.org" class="text-blue-600">info@indianredcross.org</a>.</p>
            </div>
        </div>
    );
};

export default training;