import React, { useEffect, useState, useContext } from "react";
import ThemeContext from "../ThemeContext/ThemeContext";
import banner1 from "../assets/faq-removebg-preview.png";
import banner2 from "../assets/banner2.png";

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
      img: banner1,
    },
  ];

  // Slide auto-change
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
          ? "bg-linear-to-r from-gray-950 via-gray-900 to-gray-950  text-white"
          : "bg-linear-to-r from-blue-50 to-blue-100"
      }`}
    >
      <section className="flex flex-col md:flex-row justify-between items-center px-10 py-10 w-11/12 mx-auto ">
        {/* Left Side Text */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {slides[currentSlide].title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-blue-600">
              {slides[currentSlide].title.split(" ").slice(-1)}
            </span>
          </h1>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-6`}>
            {slides[currentSlide].desc}
          </p>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-lg text-lg hover:bg-orange-600 transition">
            Read More
          </button>
        </div>

        {/* Right Side Image */}
        <div className="mt-10 md:mt-0 flex justify-center">
          <img
            src={slides[currentSlide].img}
            alt="Banner Illustration"
            className="w-[320px] md:w-full transition-transform duration-700"
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
              currentSlide === index ? "bg-blue-600 w-5" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
