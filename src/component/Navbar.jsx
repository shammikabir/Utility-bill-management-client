import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import ThemeContext from "../ThemeContext/ThemeContext";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have logged out successfully.",
              icon: "success",
              confirmButtonText: "Ok",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
              confirmButtonText: "Ok",
            });
          });
      }
    });
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 text-gray-100"
          : "bg-white text-gray-800"
      } transition-colors duration-500 shadow-md`}
    >
      <nav className="flex justify-between items-center lg:mx-25 mx-4 py-4 md:py-5">
        {/* ---------- LOGO ---------- */}
        <div className="flex items-center gap-2 text-2xl font-bold select-none">
          <div
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
              darkMode
                ? "bg-orange-500/90"
                : "bg-gradient-to-r from-[#004AAD] to-[#007BFF]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6"
            >
              <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6.586a1 1 0 0 0 .707-.293l6.414-6.414A1 1 0 0 0 20 14.586V4a2 2 0 0 0-2-2H6zm8 15v3.586L17.586 17H14a1 1 0 0 0-1 1zm-6-9h8v2H8V8zm0 4h5v2H8v-2z" />
            </svg>
            <div className="absolute -bottom-1 -right-1 bg-[#FF8A3D] rounded-full p-[2px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <span
            className={`text-2xl libre-baskerville-bold font-extrabold ${
              darkMode
                ? "text-transparent bg-clip-text bg-linear-to-r from-orange-300 to-yellow-500"
                : "text-transparent bg-clip-text bg-linear-to-r from-orange-700 to-yellow-600"
            }`}
          >
            UtilityEase
          </span>
        </div>

        {/* ---------- DESKTOP MENU (lg only) ---------- */}
        <ul className="hidden lg:flex gap-6 text-[17px] items-center libre-baskerville-bold text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer transition-all px-2 py-1 rounded-md ${
                isActive
                  ? darkMode
                    ? "text-orange-400"
                    : "text-blue-600"
                  : darkMode
                  ? "hover:text-orange-400 hover:bg-gray-700/30"
                  : "hover:text-blue-600 hover:bg-gray-100"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/bills"
            className={({ isActive }) =>
              `cursor-pointer transition-all px-2 py-1 rounded-md ${
                isActive
                  ? darkMode
                    ? "text-orange-400"
                    : "text-blue-600"
                  : darkMode
                  ? "hover:text-orange-400 hover:bg-gray-700/30"
                  : "hover:text-blue-600 hover:bg-gray-100"
              }`
            }
          >
            Bills
          </NavLink>

          {user && (
            <NavLink
              to="/myPaybills"
              className={({ isActive }) =>
                `cursor-pointer transition-all px-2 py-1 rounded-md ${
                  isActive
                    ? darkMode
                      ? "text-orange-400"
                      : "text-blue-600"
                    : darkMode
                    ? "hover:text-orange-400 hover:bg-gray-700/30"
                    : "hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              My Pay Bills
            </NavLink>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-xl p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* User Info */}
          {user && (
            <div className="relative group">
              <img
                src={user?.photoURL || ""}
                alt="User"
                className="w-12 h-12 rounded-full border border-gray-400 shadow-md cursor-pointer object-cover"
              />
              <div className="absolute left-1/2 -translate-x-1/2 top-12 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {user?.displayName || "User"}
              </div>
            </div>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-4 py-2 bg-linear-to-r from-[#ef3a0d] to-[#ff6f47] text-white rounded-lg hover:bg-red-600 transition"
            >
              <FiLogOut /> Logout
            </button>
          )}
        </ul>

        {/* ---------- MOBILE + MD MENU TOGGLE ---------- */}
        <div className="flex items-center gap-3 lg:hidden">
          {user && (
            <img
              src={user?.photoURL || ""}
              alt="User"
              className="w-9 h-9 rounded-full border border-gray-400 shadow-md object-cover"
            />
          )}
          <button
            onClick={toggleDarkMode}
            className="text-xl p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button className="text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* ---------- MOBILE + MD MENU ---------- */}
      {menuOpen && (
        <div
          className={`lg:hidden ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
          } shadow-lg px-6 py-4 space-y-3 transition-all duration-300`}
        >
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block py-2 px-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            Home
          </NavLink>
          <NavLink
            to="/bills"
            onClick={() => setMenuOpen(false)}
            className="block py-2 px-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            Bills
          </NavLink>
          {user && (
            <NavLink
              to="/myPaybills"
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              My Pay Bills
            </NavLink>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <FiLogOut /> Logout
            </button>
          ) : (
            <NavLink to="/auth/login">
              <button className="w-1/3 bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700">
                Login
              </button>
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
}
