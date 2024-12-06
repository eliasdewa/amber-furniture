import { useState } from "react";
import { toast } from "react-toastify";
import { useSendEmailSubscriptionMutation } from "../redux/features/emails/emailsApi";

const Footer = () => {
  return (
    <footer className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 py-8 place-items-center sm:place-content-start align-baseline">
        {/* Contact info */}
        <div className="text-center sm:text-start">
          <h4 className="mb-6 text-[1.2rem] font-extrabold text-gray-900">
            LET'S GET IN TOUCH
          </h4>
          <p className="mb-4 font-medium text-gray-500">
            <span className="mr-2 text-xl">
              <i className="ri-map-pin-2-fill"></i>
            </span>
            123, Addis Ababa, Ethiopia
          </p>
          <p className="mb-4 font-medium text-gray-500">
            <span className="mr-2 text-xl">
              <i className="ri-mail-fill"></i>
            </span>
            ambar-furniture@gmail.com
          </p>
          <p className="mb-4 font-medium text-gray-500">
            <span className="mr-2 text-xl">
              <i className="ri-phone-fill"></i>
            </span>
            +251 910 634296
          </p>
          {/* Social media icons */}
          <ul className="flex gap-2 sm:gap-4 justify-center sm:justify-start mb-2">
            <li>
              <a
                href="https://www.facebook.com/ambar-furniture"
                rel="noreferrer"
                target="_blank"
                className="hover:text-primary"
              >
                <i className="ri-facebook-circle-fill ri-xl"></i>
              </a>
            </li>

            <li>
              <a
                href="https://www.Instagram.com/ambar-furniture"
                rel="noreferrer"
                target="_blank"
                className="hover:text-primary"
              >
                <i className="ri-instagram-fill ri-xl"></i>
              </a>
            </li>

            <li>
              <a
                href="https://www.twitter.com/ambar-furniture"
                rel="noreferrer"
                target="_blank"
                className="hover:text-primary"
              >
                <i className="ri-twitter-fill ri-xl"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.ambar-furniture.com"
                rel="noreferrer"
                target="_blank"
                className="hover:text-primary"
              >
                <i className="ri-dribbble-line ri-xl"></i>
              </a>
            </li>
          </ul>
        </div>
        {/* About company */}
        <div className="text-center sm:text-start">
          <h4 className="mb-6 text-[1.2rem] font-extrabold text-gray-900">
            COMPANY
          </h4>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            Home
          </a>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            About Us
          </a>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            Work With Us
          </a>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            Terms & Conditions
          </a>
        </div>
        {/* Useful links */}
        <div className="text-center sm:text-start">
          <h4 className="mb-6 text-[1.2rem] font-extrabold text-gray-900">
            HELPFUL LINKS
          </h4>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            Help
          </a>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            Track your order
          </a>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            Office
          </a>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            Cafe
          </a>
        </div>
        {/* Legal links */}
        <div className="text-center sm:text-start">
          <h4 className="mb-6 text-[1.2rem] font-extrabold text-gray-900">
            LEGAL
          </h4>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            Accessibility
          </a>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            Returns Policy
          </a>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            Refund Policy
          </a>
          <a href="#" className="block mb-4 font-medium hover:text-primary">
            Hiring Statistics
          </a>
        </div>
      </div>
      <div className="p-4 text-center text-sm border-t-2">
        Copyright &copy; 2025 Ambar Furniture. All rights reserved
      </div>
    </footer>
  );
};
export default Footer;
