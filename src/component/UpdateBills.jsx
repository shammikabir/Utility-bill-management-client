import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import ThemeContext from "../ThemeContext/ThemeContext";
import { toast } from "react-toastify";

const UpdateBills = ({
  selectedBill,
  setSelectedBill,
  setShowUpdateModal,
  showUpdateModal,
  setBills,
}) => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  // ✅ Update bill
  const handleUpdate = (e) => {
    e.preventDefault();
    const { _id, ...billData } = selectedBill;

    fetch(`http://localhost:3000/myBills/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(billData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Bill updated!");
          setShowUpdateModal(false);
          fetch(`http://localhost:3000/myBills/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.success) setBills(data.result);
            });
        } else {
          toast.error("Update failed!");
        }
      })
      .catch(() => toast.error("Server error!"));
  };

  return (
    <div>
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`w-full max-w-md p-6 rounded-2xl shadow-lg transition-all duration-300 ${
              darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Update Bill</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Amount */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-600 dark:text-gray-300">
                  Amount
                </label>
                <input
                  type="number"
                  value={selectedBill.amount}
                  onChange={(e) =>
                    setSelectedBill({ ...selectedBill, amount: e.target.value })
                  }
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-700 bg-gray-800 text-gray-100"
                      : "border-gray-300 bg-gray-50"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                  placeholder="Enter amount"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-600 dark:text-gray-300">
                  Address
                </label>
                <input
                  type="text"
                  value={selectedBill.address}
                  onChange={(e) =>
                    setSelectedBill({
                      ...selectedBill,
                      address: e.target.value,
                    })
                  }
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-700 bg-gray-800 text-gray-100"
                      : "border-gray-300 bg-gray-50"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                  placeholder="Enter address"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-600 dark:text-gray-300">
                  Phone
                </label>
                <input
                  type="text"
                  value={selectedBill.phone}
                  onChange={(e) =>
                    setSelectedBill({ ...selectedBill, phone: e.target.value })
                  }
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-700 bg-gray-800 text-gray-100"
                      : "border-gray-300 bg-gray-50"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                  placeholder="Enter phone"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-600 dark:text-gray-300">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedBill.date}
                  onChange={(e) =>
                    setSelectedBill({ ...selectedBill, date: e.target.value })
                  }
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-700 bg-gray-800 text-gray-100"
                      : "border-gray-300 bg-gray-50"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition"
              >
                Update Bill
              </button>
            </form>

            <button
              onClick={() => setShowUpdateModal(false)}
              className="mt-4 w-full text-center text-gray-500 hover:text-red-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBills;
