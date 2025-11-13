import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  FaTag,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBill,
  FaArrowLeft,
} from "react-icons/fa";
import ThemeContext from "../ThemeContext/ThemeContext";
import PayBillModal from "../component/PayBillModal";
import ErrorBills from "./ErrorBills";
import Loading from "./Loading";
import { RiBillFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";

const Billdetails = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`http://localhost:3000/allbills/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.result && data.result._id) {
          setBill(data.result);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (error || !bill) {
    return <ErrorBills />;
  }

  // Check if current month
  const currentMonth = new Date().getMonth();
  const billMonth = new Date(bill.date).getMonth();
  const isCurrentMonth = currentMonth === billMonth;

  return (
    <div
      className={`min-h-screen py-12 px-4 flex justify-center items-center ${
        darkMode
          ? "bg-[#0f0f0f] text-gray-100"
          : "bg-linear-to-b from-[#F3F8FF] via-[#FFFFFF] to-[#EDEADE] text-gray-800"
      }`}
    >
      <div
        className={`max-w-4xl w-full rounded-3xl shadow-2xl border overflow-hidden transition-all duration-300 ${
          darkMode ? "bg-[#1b1b1b] border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        {/* Top Image with Overlay */}
        <div className="relative w-full h-72 overflow-hidden">
          <img
            src={bill.image || "https://via.placeholder.com/800x400"}
            alt={bill.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

          {/* Back Button */}
          <Link
            to="/bills"
            className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm shadow hover:shadow-lg"
          >
            <FaArrowLeft /> Back
          </Link>

          {/* Title */}
          <h2 className="absolute bottom-6 left-6 text-3xl md:text-4xl text-white drop-shadow-lg libre-baskerville-bold">
            {bill.title}
          </h2>
        </div>

        {/* Bill Details */}
        <div className="p-8 md:p-10 space-y-6">
          <div className="grid sm:grid-cols-2 gap-5 text-sm md:text-base">
            <div className="flex items-center gap-3">
              <FaTag className="text-green-500 text-xl" />
              <p>
                <span className="font-semibold text-gray-500">Category:</span>{" "}
                {bill.category}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
              <p>
                <span className="font-semibold text-gray-500">Location:</span>{" "}
                {bill.location}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-blue-500 text-xl" />
              <p>
                <span className="font-semibold text-gray-500">Date:</span>{" "}
                {bill.date}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaMoneyBill className="text-yellow-500 text-xl" />
              <p>
                <span className="font-semibold text-gray-500">Amount:</span>{" "}
                <span className="font-bold text-lg">${bill.amount}</span>
              </p>
            </div>
          </div>

          <div className={`h-px ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 libre-baskerville-bold">
              Description
            </h3>
            <p className="leading-relaxed text-justify text-gray-600 dark:text-gray-300">
              {bill.description ||
                "No detailed description available for this bill."}
            </p>
          </div>

          {/* Pay Button */}
          <div className="text-center pt-6">
            <button
              disabled={!isCurrentMonth}
              onClick={() => setShowModal(true)}
              className={`px-8 py-3 rounded-xl font-semibold shadow-lg transition-all libre-baskerville-bold duration-300 ${
                isCurrentMonth
                  ? "bg-linear-to-r from-[#004AAD] to-[#007BFF] hover:opacity-90 text-white hover:shadow-xl"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {isCurrentMonth ? (
                <span className="flex items-center gap-2">
                  <RiBillFill size={20} /> Pay Bill
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-500">
                  <ImCross /> Only current month bills can be paid
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <PayBillModal
          bill={bill}
          userEmail="user@example.com"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Billdetails;
