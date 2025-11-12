import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../ThemeContext/ThemeContext";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import errorimg from "../assets/404-error-7743230-6786251-removebg-preview.png";

const ErrorPage = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-[#0f172a] text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar />

      {/* Error Section */}
      <div className=" flex items-center justify-center px-4 mt-15">
        <div className="text-center max-w-md">
          <img
            src={errorimg}
            alt="Error"
            className="mx-auto mb-4 w-72 md:w-96 drop-shadow-lg"
          />

          <h2
            className={`md:text-4xl text-2xl font-bold mb-3 ${
              darkMode ? "text-orange-400" : "text-black"
            }`}
          >
            OOPS, PAGE NOT FOUND!
          </h2>

          <p
            className={`text-sm md:text-base mb-6 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            The page you are looking for doesn’t exist or has been moved.
          </p>

          <Link
            to="/"
            className={`inline-block px-6 py-3 mb-15 rounded-lg text-lg font-medium shadow-md transition-all duration-300 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-orange-600 hover:bg-orange-700 text-white"
            }`}
          >
            Go Back Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ErrorPage;
