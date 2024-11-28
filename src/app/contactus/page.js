"use client";
import React from 'react';
import ContactForm from '@/app/components/ContactForm';

const contact = () => {
  return (
    <div className="relative bg-cover bg-center" 
         style={{ backgroundImage:'url("https://www.shutterstock.com/image-photo/concept-contact-us-customer-support-600nw-2505308177.jpg")' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay for readability */}
      <div className="relative z-10">

        {/* Header */}
        <header className="custom-header bg-blue-500">
          <h1 className="custom-header-title">Contact Us</h1>
        </header>

        {/* Main Content */}
        <main className="custom-main-content">
          <div className="custom-grid">

            {/* Address Section */}
            <section className="custom-card">
              <p>If you have any questions, information, or any issue in our website please send the   post on our respective address</p>
              <h2 className="custom-card-title">Postal Address:</h2>
              <p>NDMA Bhawan, A-1, Safdarjung Enclave</p>
              <p>New Delhi - 110029</p>
              <a href="https://www.google.com/maps/search/?api=1&query=National+Disaster+Management+Authority,+New+Delhi"
                target="_blank" className="custom-link">View on Map</a>
            </section>

            {/* Contact Information Section */}
            <section className="custom-card">
              <p>If you have any questions ,concerns or information related to disaster or anything urgent issue, please contact our head Office </p>
              <h2 className="custom-card-title">Telephones:</h2>
              <p><strong>+91-11-26701700</strong> (Mon-Fri: 9:30 AM-6:00 PM)</p>
              <p>Control Room: <strong>+91-11-26701728</strong> (Mon-Fri (24x7))</p>
              <p>Fax: <strong>+91-11-26701729</strong></p>
              <p>Email: <a href="mailto:controlroom@ndma.gov.in" className="custom-link">controlroom@ndma.gov.in</a></p>
            </section>

          </div>

          {/* Map Section */}
          <div className="custom-map">
            <iframe
              className="custom-iframe"
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3495.4486050099!2d77.19354891614854!3d28.561334482440244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce22224821715%3A0x1bcdde9355bfbf0a!2sNational%20Disaster%20Management%20Authority!5e0!3m2!1sen!2sin!4v1634024936784!5m2!1sen!2sin"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0">
            </iframe>
          </div>

          {/* Connect with us Section */}
          <div className="custom-grid">
            <section className="custom-card custom-card-last" id="custom-last-card">
              <h2 className="custom-card-title">Connect with us:</h2>
              <p>
                <img 
                  src="https://cdn.icon-icons.com/icons2/4029/PNG/512/twitter_x_new_logo_x_rounded_icon_256078.png"
                  alt="Twitter logo"
                  className="inline-block h-8 w-11 ml-2 mr-1"
                />
                <strong>Twitter (X):</strong>
                <a href="https://x.com/i/flow/login?redirect_after_login=%2Fnidmmhaindia" target="_blank" className="custom-link">
                  @ndmaindia
                </a>
              </p>
              <p>
                <img 
                  src="https://e7.pngegg.com/pngimages/480/615/png-clipart-facebook-logo-facebook-computer-icons-desktop-s-icon-facebook-blue-text-thumbnail.png"
                  alt="facebook logo"
                  className="inline-block h-6 w-8 ml-2 mr-1"
                />
                <strong>Facebook:</strong>
                <a href="https://m.facebook.com/NDMA.in/" target="_blank" className="custom-link"> NDMA</a>
              </p>
              <p>
                <img 
                  src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png"
                  alt="YouTube logo"
                  className="inline-block h-6 w-7 ml-2 mr-1"
                />
                <strong>Youtube:</strong>
                <a href="https://www.youtube.com/@INGS_you" target="_blank" className="custom-link"> @INGS_you</a>
              </p>
              <p>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png"
                  alt="Instagram logo"
                  className="inline-block h-6 w-6 ml-2 mr-1"
                />
                <strong>Instagram:</strong>
                <a href="https://www.instagram.com/ings_official_/profilecard/?igsh=MWhpZ3RicHFmenRiYg==" target="_blank" className="custom-link"> ings_official_</a>
              </p>
            </section>
          </div>

        </main>
      </div>
    </div>
  );
};

export default contact;
