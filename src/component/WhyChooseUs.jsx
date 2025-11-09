import {
  FaShieldAlt,
  FaBolt,
  FaFileInvoiceDollar,
  FaMobileAlt,
} from "react-icons/fa";
import { useContext } from "react";
import { motion } from "framer-motion";
import ThemeContext from "../ThemeContext/ThemeContext";
import chooseImage from "../assets/WhatsApp_Image_2025-11-09_at_11.36.55_PM-removebg-preview.png"; // 🖼️ your image path here

const WhyChooseUs = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section
      className={`py-20 px-6 md:px-20 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-gray-100"
          : "bg-gradient-to-r from-blue-50 via-white to-blue-50 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side Content */}
        <div>
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
              Why{" "}
              <span
                className={`${darkMode ? "text-orange-400" : "text-blue-600"}`}
              >
                Choose Us
              </span>
            </h2>
            <p
              className={`max-w-md ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              We make your utility bill management simpler, faster, and safer.
              Experience seamless payments and complete control at your
              fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl shadow-md ${
                darkMode
                  ? "bg-gray-900 border border-gray-700"
                  : "bg-white border border-blue-100"
              } transition-all duration-300`}
            >
              <FaShieldAlt
                className={`text-4xl mb-4 ${
                  darkMode ? "text-orange-400" : "text-blue-600"
                }`}
              />
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Every transaction is encrypted and protected with top-tier
                security.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl shadow-md ${
                darkMode
                  ? "bg-gray-900 border border-gray-700"
                  : "bg-white border border-blue-100"
              } transition-all duration-300`}
            >
              <FaBolt
                className={`text-4xl mb-4 ${
                  darkMode ? "text-blue-400" : "text-orange-500"
                }`}
              />
              <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Pay your bills in seconds with our optimized system.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl shadow-md ${
                darkMode
                  ? "bg-gray-900 border border-gray-700"
                  : "bg-white border border-blue-100"
              } transition-all duration-300`}
            >
              <FaFileInvoiceDollar
                className={`text-4xl mb-4 ${
                  darkMode ? "text-orange-400" : "text-blue-600"
                }`}
              />
              <h3 className="text-lg font-semibold mb-2">Easy Tracking</h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Access your payment history and download reports anytime.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl shadow-md ${
                darkMode
                  ? "bg-gray-900 border border-gray-700"
                  : "bg-white border border-blue-100"
              } transition-all duration-300`}
            >
              <FaMobileAlt
                className={`text-4xl mb-4 ${
                  darkMode ? "text-blue-400" : "text-orange-500"
                }`}
              />
              <h3 className="text-lg font-semibold mb-2">Mobile Friendly</h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Manage your bills anytime, anywhere from any device.
              </p>
            </motion.div>
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
            className="w-10/12 md:w-11/12  transition-transform duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
