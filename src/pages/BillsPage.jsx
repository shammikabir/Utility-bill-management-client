import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../ThemeContext/ThemeContext";
import { FaMapMarkerAlt, FaTag, FaDollarSign } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "./Loading";

function BillsPage() {
  const [bills, setBills] = useState([]);
  const [category, setCategory] = useState("");
  const { darkMode } = useContext(ThemeContext);
  const { loading } = useContext(AuthContext);
  //   all bills load
  useEffect(() => {
    fetch("https://utility-server-two.vercel.app/allbills")
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.log(err));
  }, []);

  // category change
  const handleFilter = (value) => {
    setCategory(value);

    if (value === "") {
      //all bills
      fetch("https://utility-server-two.vercel.app/allbills")
        .then((res) => res.json())
        .then((data) => setBills(data));
    } else {
      // category filter
      fetch(
        `https://utility-server-two.vercel.app/bills/filter?category=${value}`
      )
        .then((res) => res.json())
        .then((data) => setBills(data));
    }
  };

  return (
    <section
      className={`py-5  md:px-12 transition-colors  duration-500 ${
        darkMode ? "bg-gray-900  text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="p-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Track & Pay Your{" "}
          <span className={`${darkMode ? "text-orange-400" : "text-blue-600"}`}>
            Bills Seamlessly
          </span>
        </h2>
        <p
          className={`max-w-2xl mx-auto text-base md:text-lg mb-10 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Manage and monitor all your utility bills efficiently with just a few
          clicks.
        </p>

        {/* Category Dropdown */}

        <div className="text-center mb-8 relative w-64 mx-auto">
          <select
            value={category}
            onChange={(e) => handleFilter(e.target.value)}
            className={`w-full appearance-none px-4 py-2 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300
      ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
          : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
      }`}
          >
            <option value="">All Categories</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Gas">Gas</option>
            <option value="Internet">Internet</option>
          </select>

          {/*  Icon Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <FiChevronDown
              className={`w-5 h-5 ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            />
          </div>
        </div>
        {/* Bills List */}
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mb-20 mx-auto">
            {bills.map((bill) => (
              <div
                key={bill._id}
                className={`border rounded-2xl p-4 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 
        ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }
        flex flex-col justify-between`}
              >
                {/* Image */}

                <div className="relative">
                  <img
                    src={bill.image}
                    alt={bill.title}
                    className="w-full h-36 object-cover rounded-xl mb-4"
                  />

                  {/* Overlay */}
                  {/* <div className="absolute inset-0 bg-black/25 rounded-xl"></div> */}

                  {/* Category badge */}
                  <span
                    className={`absolute top-2 left-2 text-xs px-4 py-1 rounded-full shadow 
      ${darkMode ? "bg-orange-500 text-white" : "bg-orange-600 text-white"}`}
                  >
                    {bill.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`text-lg font-semibold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {bill.title}
                </h3>

                {/* Info  */}
                <div className="flex justify-between items-center mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt
                      className={`${
                        darkMode ? "text-red-400" : "text-red-500"
                      }`}
                    />
                    <span
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {bill.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaDollarSign
                      className={`${
                        darkMode ? "text-green-400" : "text-green-500"
                      }`}
                    />
                    <span
                      className={`text-[16px] font-semibold ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {bill.amount}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <Link to={`/bills/${bill._id}`}>
                  <button
                    className={`w-full py-2 rounded-lg transition
        ${
          darkMode
            ? "bg-linear-to-r from-[#004AAD] to-[#007BFF] hover:opacity-90 text-white"
            : "bg-linear-to-r from-[#004AAD] to-[#007BFF] hover:opacity-90 text-white"
        }`}
                  >
                    See Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BillsPage;
