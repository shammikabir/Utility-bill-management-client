import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhoneInTalk, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-gray-900 via-gray-950 to-black text-gray-200 py-12 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl font-bold text-orange-400">UtilityEase</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Simplify your utility bill payments with speed, security, and ease —
            all in one platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-orange-500 transition duration-300 cursor-pointer">
              Home
            </li>
            <li className="hover:text-orange-500 transition duration-300 cursor-pointer">
              About Us
            </li>
            <li className="hover:text-orange-500 transition duration-300 cursor-pointer">
              Recent Bills
            </li>
            <li className="hover:text-orange-500 transition duration-300 cursor-pointer">
              Contact
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-3">Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-orange-500 transition duration-300 cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-orange-500 transition duration-300 cursor-pointer">
              FAQs
            </li>
            <li className="hover:text-orange-500 transition duration-300 cursor-pointer">
              Payment Guide
            </li>
            <li className="hover:text-orange-500 transition duration-300 cursor-pointer">
              Feedback
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-3">
            Get in Touch
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center gap-2 hover:text-orange-500 transition duration-300">
              <MdEmail className="text-orange-500" /> support@utilityease.com
            </li>
            <li className="flex items-center gap-2 hover:text-orange-500 transition duration-300">
              <MdPhoneInTalk className="text-orange-500" /> +49 123 456 789
            </li>
            <li className="flex items-center gap-2 hover:text-orange-500 transition duration-300">
              <MdLocationOn className="text-orange-500" /> Berlin, Germany
            </li>
          </ul>

          {/* Social Links */}
          <div className="flex gap-4 mt-4 text-2xl">
            <FaSquareXTwitter className="hover:text-orange-500 transition duration-300 cursor-pointer" />
            <FaFacebookSquare className="hover:text-orange-500 transition duration-300 cursor-pointer" />
            <FaLinkedin className="hover:text-orange-500 transition duration-300 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-orange-500 font-medium">UtilityEase</span>. All
          rights reserved.
        </p>
        <div className="mt-2 space-x-2">
          <a href="#" className="hover:text-orange-500 transition duration-300">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:text-orange-500 transition duration-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
