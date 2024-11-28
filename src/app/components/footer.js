"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-blue-900 text-white py-12">
      <div className="flex flex-col container mx-auto px-6 lg:px-16">
        {/* Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-36">
          {/* Column 1 */}
          {/* <div>
            <h4 className="font-semibold text-lg mb-4">HOME</h4>
            <ul className="space-y-2 text-sm">
            
            </ul>
          </div> */}

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">DASHBOARD</h4>
            <ul className="space-y-2 text-sm">
              <li>Severity Map</li>
              <li>Time-series Graph</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">PHOTO GALLERY</h4>
            <ul className="space-y-2 text-sm">
              <li>Photos</li>
              <li>Videos</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">CONTACT US</h4>
            <ul className="space-y-2 text-sm">
              <li>Headquarters</li>
              <li>Locations</li>
              <li>Social Media</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">ABOUT US</h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Our Mission</li>
              <li>History</li>
              <li>Our Team</li>
            </ul>
          </div>

          {/* Column 6 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">NEWS</h4>
            <ul className="space-y-2 text-sm">
              <li>Images</li>
              <li>Bookmark</li>
              <li>Saved Articles</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
      <div className="my-3 border-t border-blue-500"></div>

        {/* Connect with Us Section */}
      <div className="grid grid-cols-1 gap-8">
          {/* Social Media Links*/}
        <div>
          <div className="space-y-1 text-sm flex gap-8 items-center">
            <p className="flex items-center gap-2">
              <img src="https://cdn.icon-icons.com/icons2/4029/PNG/512/twitter_x_new_logo_x_rounded_icon_256078.png" alt="Twitter logo" className="" width={40}/>
              <strong>Twitter (X):</strong>{" "}
              <a href="https://x.com/i/flow/login?redirect_after_login=%2Fnidmmhaindia" target="_blank" rel="noopener noreferrer" className="underline">@ndmaindia</a>
            </p>
            <p className="flex items-center gap-2">
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/512px-2021_Facebook_icon.svg.png"
                alt="Facebook logo"
                 className=""
                 width={24}
              />
              <strong>Facebook:</strong>{" "}
              <a
                href="https://m.facebook.com/NDMA.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                NDMA
              </a>
            </p>
            <p className="flex items-center gap-2">
              <img
                src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png"
                alt="YouTube logo"
                className=""
                width={24}
              />
              <strong>YouTube:</strong>{" "}
              <a
                href="https://www.youtube.com/@INGS_you"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @INGS_you
              </a>
            </p>
            <p className="flex items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png"
                alt="Instagram logo"
                className=""
                width={24}
              />
              <strong>Instagram:</strong>{" "}
              <a
                href="https://www.instagram.com/ings_official_/profilecard/?igsh=MWhpZ3RicHFmenRiYg=="
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                ings_official_
              </a>
            </p>
          </div>
        </div>
      </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center">
          <p className="text-sm">&copy; 2024 Disaster Management Platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
