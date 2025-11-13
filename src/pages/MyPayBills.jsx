import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import ThemeContext from "../ThemeContext/ThemeContext";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import UpdateBills from "../component/UpdateBills";
import DeleteBills from "../component/DeleteBills";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyPayBills = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/myBills/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setBills(data.result);
        })
        .catch(() => toast.error("Failed to load bills"));
    }
  }, [user]);

  const totalBills = bills.length;
  const totalAmount = bills.reduce((sum, bill) => sum + Number(bill.amount), 0);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(59, 130, 246);
    doc.text("My Pay Bills Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Username", "Email", "Amount", "Address", "Phone", "Date"]],
      body: bills.map((b) => [
        b.username,
        b.email,
        b.amount,
        b.address,
        b.phone,
        b.date,
      ]),
      theme: "striped",
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      styles: { fontSize: 10 },
    });

    doc.save("MyPayBillsReport.pdf");
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      } min-h-screen p-6 transition-all`}
    >
      <h1
        className={`text-3xl sm:text-4xl my-4 libre-baskerville-bold text-center ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        My Pay Bills
      </h1>
      <p
        className={`text-center text-sm sm:text-base mb-15 ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        View and manage all your paid bills easily. Download reports or update
        your records anytime.
      </p>

      {/* Summary Cards with images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div
          className={`p-6 rounded-2xl shadow flex items-center gap-4 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/041/944/473/non_2x/3d-rendering-bill-payment-icon-png.png"
            alt="Bills Paid"
            className="w-20"
          />
          <div>
            <p className="text-lg font-medium text-gray-500">
              Total Bills Paid
            </p>
            <p className="text-3xl font-bold mt-2">{totalBills}</p>
          </div>
        </div>
        <div
          className={`p-6 rounded-2xl shadow flex items-center gap-4 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/023/220/723/original/3d-cartoon-design-illustration-of-money-bag-and-dollar-coin-money-savings-concept-png.png"
            className="w-30"
          />
          <div>
            <p className="text-lg font-medium text-gray-500">Total Amount</p>
            <p
              className={`text-3xl font-bold mt-2 ${
                darkMode ? "text-orange-500" : "text-blue-500"
              }`}
            >
              ${totalAmount}
            </p>
          </div>
        </div>
        <div
          className={`p-6 rounded-2xl shadow flex justify-center items-center ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition text-lg"
          >
            <FaDownload /> Download PDF
          </button>
        </div>
      </div>

      {/* Bills Table */}
      <div
        className={`overflow-x-auto rounded-2xl shadow mb-20 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`border-b ${
                darkMode
                  ? "border-gray-700 bg-gray-400 text-black"
                  : "border-gray-300"
              } bg-gray-50`}
            >
              {[
                "Username",
                "Email",
                "Amount",
                "Address",
                "Phone",
                "Date",
                "Actions",
              ].map((title) => (
                <th
                  key={title}
                  className="p-3 text-sm sm:text-base font-semibold text-gray-700"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr
                key={bill._id}
                className={`border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } `}
              >
                <td className="p-3">{bill.username}</td>
                <td className="p-3">{bill.email}</td>
                <td className="p-3 font-medium">৳{bill.amount}</td>
                <td className="p-3">{bill.address}</td>
                <td className="p-3">{bill.phone}</td>
                <td className="p-3">{bill.date}</td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      setSelectedBill(bill);
                      setShowUpdateModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 p-3 mr-2 rounded-full bg-blue-100 hover:bg-blue-200 transition text-xl"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBill(bill);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-600 hover:text-red-800 p-3 rounded-full bg-red-100 hover:bg-red-200 transition text-xl"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <UpdateBills
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        selectedBill={selectedBill}
        setSelectedBill={setSelectedBill}
        setBills={setBills}
      />
      <DeleteBills
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        selectedBill={selectedBill}
        setSelectedBill={setSelectedBill}
        setBills={setBills}
      />
    </div>
  );
};

export default MyPayBills;
