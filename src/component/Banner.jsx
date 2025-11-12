import React, { useEffect, useState, useContext } from "react";
import ThemeContext from "../ThemeContext/ThemeContext";
import Typewriter from "typewriter-effect"; // ✅ added
import banner1 from "../assets/faq-removebg-preview.png";
import banner2 from "../assets/img3.png";
import banner3 from "../assets/img1.png";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { darkMode } = useContext(ThemeContext);

  const slides = [
    {
      title: "Utility Bills Payment",
      desc: "Pay all your utility bills easily and securely in just one click. No more long queues or waiting time.",
      img: banner1,
    },
    {
      title: "Fast & Secure Transactions",
      desc: "Experience lightning-fast payments with our secure and user-friendly platform.",
      img: banner2,
    },
    {
      title: "Manage All Bills in One Place",
      desc: "Track and manage your electricity, water, and gas bills effortlessly from one dashboard.",
      img: banner3,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      className={`transition-all duration-700 ease-in-out ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 text-gray-100"
          : "bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800"
      }`}
    >
      <section className="flex flex-col md:flex-row justify-between items-center px-10 py-12 w-11/12 mx-auto">
        {/* Left Side Text */}
        <div className="max-w-xl text-center md:text-left">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            <Typewriter
              options={{
                strings: [
                  slides[currentSlide].title,
                  "Pay Bills with One Click 💡",
                  "Track, Manage & Save Time ⏱️",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </h1>

          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-6`}>
            {slides[currentSlide].desc}
          </p>

          <button
            className={`px-6 py-3 rounded-lg text-lg font-semibold transition ${
              darkMode
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            }`}
          >
            Read More
          </button>
        </div>

        {/* Right Side Image */}
        <div className="mt-10 md:mt-0 flex justify-center">
          <img
            src={slides[currentSlide].img}
            alt="Banner Illustration"
            className={`w-[320px] md:w-full transition-transform duration-700 ${
              darkMode ? "shadow-xl rounded-lg" : ""
            }`}
          />
        </div>
      </section>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2 pb-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? darkMode
                  ? "bg-orange-400 w-5"
                  : "bg-blue-600 w-5"
                : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
