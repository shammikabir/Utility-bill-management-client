import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import ThemeContext from "../ThemeContext/ThemeContext";
import { toast } from "react-toastify";

const DeleteBills = ({
  setShowDeleteModal,
  setBills,
  showDeleteModal,
  selectedBill,
}) => {
  const { darkMode } = useContext(ThemeContext);

  const handleDelete = (id) => {
    fetch(`https://utility-server-two.vercel.app/myBills/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Bill deleted successfully!");
        setBills((prev) => prev.filter((b) => b._id !== id));
        setShowDeleteModal(false);
      })
      .catch(() => toast.error("Failed to delete"));
  };

  return (
    <div>
      {/* 🔹 Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-xl w-full max-w-sm ${
              darkMode ? "bg-[#1e1e1e]" : "bg-white"
            } text-center`}
          >
            <h3 className="text-lg font-semibold mb-3">
              Are you sure you want to delete?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(selectedBill._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:opacity-60 transition "
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-black transitio"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBills;
