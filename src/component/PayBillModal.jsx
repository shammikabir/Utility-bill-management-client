import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthContext";
import {
  FaTimes,
  FaCreditCard,
  FaEnvelope,
  FaIdBadge,
  FaMoneyBill,
  FaCalendarAlt,
} from "react-icons/fa";
import ThemeContext from "../ThemeContext/ThemeContext";

const PayBillModal = ({ bill, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    additionalInfo: "",
  });

  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentData = {
      email: user.email,
      billId: bill._id,
      amount: bill.amount,
      username: formData.username || user?.displayName,
      address: formData.address,
      phone: formData.phone,
      date: bill.date,
      additionalInfo: formData.additionalInfo,
    };

    fetch("http://localhost:3000/myBills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Payment Successful!");
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm p-4 sm:p-8 `}
      onClick={onClose} // Close on outside click
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
        className={`relative rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 border overflow-auto max-h-[90vh]
          ${
            darkMode
              ? "bg-linear-to-b from-[#1E1E1E] to-[#121212] border-gray-700 text-gray-100"
              : "bg-linear-to-b from-white to-[#f8f8f8] border-gray-200 text-gray-800"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-5 text-2xl transition ${
            darkMode
              ? "text-gray-400 hover:text-red-500"
              : "text-gray-600 hover:text-red-500"
          }`}
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-2">
            <FaCreditCard
              className={`text-4xl ${
                darkMode ? "text-blue-700" : "text-blue-700"
              }`}
            />
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-bold libre-baskerville-bold  ${
              darkMode ? "text-orange-400" : "text-orange-600"
            }`}
          >
            Pay Your Bill
          </h2>
          <p
            className={`${
              darkMode ? "text-gray-400" : "text-gray-500"
            } text-sm`}
          >
            Secure and easy payment for your selected bill
          </p>
        </div>

        {/* Bill Info */}
        <div
          className={`p-4 rounded-xl mb-6 ${
            darkMode ? "bg-[#2a2a2a]" : "bg-gray-100"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <FaEnvelope className="text-blue-400" />
                <span className="font-medium">Email:</span>
              </div>
              <span
                className={`break-all px-3 py-2 rounded-md ${
                  darkMode
                    ? "bg-[#1a1a1a] text-gray-200"
                    : "bg-white text-gray-700"
                }`}
              >
                {user.email}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <FaIdBadge className="text-green-400" />
                <span className="font-medium">Bill ID:</span>
              </div>
              <span
                className={`break-all px-3 py-2 rounded-md ${
                  darkMode
                    ? "bg-[#1a1a1a] text-gray-200"
                    : "bg-white text-gray-700"
                }`}
              >
                {bill._id}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <FaMoneyBill className="text-yellow-400" />
                <span className="font-medium">Amount:</span>
              </div>
              <span
                className={`px-3 py-2 rounded-md ${
                  darkMode
                    ? "bg-[#1a1a1a] text-gray-200"
                    : "bg-white text-gray-700"
                }`}
              >
                ${bill.amount}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <FaCalendarAlt className="text-pink-400" />
                <span className="font-medium">Date:</span>
              </div>
              <span
                className={`px-3 py-2 rounded-md ${
                  darkMode
                    ? "bg-[#1a1a1a] text-gray-200"
                    : "bg-white text-gray-700"
                }`}
              >
                {bill.date}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Your full name"
            defaultValue={user?.displayName || ""}
            onChange={handleChange}
            required
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "border-gray-700 bg-[#1a1a1a] text-gray-100"
                : "border-gray-300 bg-white text-gray-800"
            }`}
          />
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "border-gray-700 bg-[#1a1a1a] text-gray-100"
                : "border-gray-300 bg-white text-gray-800"
            }`}
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "border-gray-700 bg-[#1a1a1a] text-gray-100"
                : "border-gray-300 bg-white text-gray-800"
            }`}
          />
          <textarea
            name="additionalInfo"
            placeholder="Additional info (optional)"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows="3"
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "border-gray-700 bg-[#1a1a1a] text-gray-100"
                : "border-gray-300 bg-white text-gray-800"
            }`}
          />
          <button
            type="submit"
            className={`w-full py-3 rounded-lg libre-baskerville-bold  shadow-md transition-all duration-300 ${
              darkMode
                ? "bg-linear-to-r from-[#e93d11] to-[#FFB347] text-white hover:opacity-80"
                : "bg-linear-to-r from-[#004AAD] to-[#007BFF] hover:opacity-80 text-white"
            }`}
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PayBillModal;
