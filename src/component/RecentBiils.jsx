import React, { useContext } from "react";
import ThemeContext from "../ThemeContext/ThemeContext";
import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { FaTag, FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "../pages/Loading";

const RecentBills = () => {
  const { darkMode } = useContext(ThemeContext);
  const { loading } = useContext(AuthContext);
  const bills = useLoaderData();

  if (loading) {
    return <Loading />;
  }

  return (
    <section
      className={`py-16 transition-colors duration-500 ${
        darkMode
          ? "bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 text-gray-100"
          : "text-gray-800"
      }`}
    >
      {/* Section Heading */}
      <div className="text-center">
        <motion.h2
          className="text-4xl font-bold text-center mb-2 libre-baskerville-bold"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Recent <span className="text-orange-600">Bills</span>
        </motion.h2>

        <motion.p
          className="text-gray-500 dark:text-gray-400 text-lg md:text-[16px] md:mb-20 md:mx-0 mx-4 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Check out your latest utility payments and stay up to date
        </motion.p>
      </div>

      {/* Bills List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-10/12 mx-auto mt-8">
        {bills.map((bill, index) => (
          <motion.div
            key={bill._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className={`relative overflow-hidden rounded-2xl border transition-transform duration-200 hover:-translate-y-1 hover:shadow-md ${
              darkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="p-6 flex flex-col justify-between h-full">
              {/* Category Badge */}
              <span
                className={`inline-flex items-center gap-3 px-2 py-1.5 rounded-full text-xs font-medium mb-3 border ${
                  darkMode
                    ? "bg-gray-800 text-gray-200 border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-200"
                }`}
              >
                <FaTag
                  className={`${
                    darkMode ? "text-blue-600" : "text-orange-600"
                  }`}
                />
                {bill.category}
              </span>

              {/* Title */}
              <h3
                className={`text-xl font-semibold mb-3 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {bill.title}
              </h3>

              {/* Location & Date */}
              <div className="flex flex-col gap-1 mb-4 text-sm">
                <div
                  className={`flex items-center gap-2 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <FaMapMarkerAlt
                    className={`${
                      darkMode ? "text-blue-600" : "text-orange-600"
                    }`}
                  />
                  {bill.location}
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <FaCalendarAlt
                    className={`${
                      darkMode ? "text-blue-600" : "text-orange-600"
                    }`}
                  />
                  {bill.date}
                </div>
              </div>

              {/* Details Button */}
              <Link to={`/bills/${bill._id}`}>
                <button
                  className={`mt-auto w-full py-2 flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ${
                    darkMode
                      ? "bg-orange-700 text-white hover:bg-orange-600"
                      : "bg-linear-to-r from-[#004AAD] to-[#007BFF] hover:opacity-90 text-white"
                  }`}
                >
                  <FaSearch /> See Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentBills;
