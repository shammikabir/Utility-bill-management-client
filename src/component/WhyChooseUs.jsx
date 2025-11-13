import {
  FaShieldAlt,
  FaBolt,
  FaFileInvoiceDollar,
  FaMobileAlt,
} from "react-icons/fa";
import { useContext } from "react";

import ThemeContext from "../ThemeContext/ThemeContext";
import chooseImage from "../assets/WhatsApp_Image_2025-11-09_at_11.36.55_PM-removebg-preview.png";

const WhyChooseUs = () => {
  const { darkMode } = useContext(ThemeContext);

  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure Payments",
      desc: "Every transaction is encrypted and protected with top-tier security.",
      color: darkMode ? "text-orange-400" : "text-blue-600",
    },
    {
      icon: FaBolt,
      title: "Fast Processing",
      desc: "Pay your bills in seconds with our optimized system.",
      color: darkMode ? "text-blue-400" : "text-orange-500",
    },
    {
      icon: FaFileInvoiceDollar,
      title: "Easy Tracking",
      desc: "Access your payment history and download reports anytime.",
      color: darkMode ? "text-orange-400" : "text-blue-600",
    },
    {
      icon: FaMobileAlt,
      title: "Mobile Friendly",
      desc: "Manage your bills anytime, anywhere from any device.",
      color: darkMode ? "text-blue-400" : "text-orange-500",
    },
  ];

  return (
    <section
      className={`py-20 px-6 md:px-20 transition-all duration-500 ${
        darkMode
          ? "bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 text-gray-100"
          : "bg-linear-to-r from-blue-50 via-white to-blue-50 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side Content */}
        <div>
          <div className="mb-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 leading-snug"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Why{" "}
              <span
                className={`${darkMode ? "text-orange-400" : "text-blue-600"}`}
              >
                Choose Us
              </span>
            </motion.h2>
            <motion.p
              className={`max-w-md ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              We make your utility bill management simpler, faster, and safer.
              Experience seamless payments and complete control at your
              fingertips.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`p-4 rounded-[5px] shadow-md ${
                  darkMode
                    ? "bg-gray-900 border border-gray-700"
                    : "bg-white border border-blue-100"
                } transition-all duration-300`}
              >
                <feature.icon className={`text-3xl mb-2 ${feature.color}`} />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src={chooseImage}
            alt="Why choose us illustration"
            className="w-10/12 md:w-full transition-transform duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
