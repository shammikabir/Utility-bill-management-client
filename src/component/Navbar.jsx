import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { FaBolt } from "react-icons/fa";
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
          ? "bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-gray-100"
          : "bg-white text-gray-800"
      } transition-colors duration-500 shadow-md`}
    >
      <nav className="flex justify-between items-center w-10/12 mx-auto py-4">
        {/* ---------- LOGO ---------- */}
        <div className="flex items-center gap-2 text-2xl font-bold select-none">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-xl shadow-md ${
              darkMode
                ? "bg-orange-500 text-gray-900"
                : "bg-blue-600 text-white"
            }`}
          >
            <FaBolt className="text-2xl" />
          </div>
          <span
            className={`text-2xl font-extrabold ${
              darkMode
                ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-500"
                : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400"
            }`}
          >
            PowerPay
          </span>
        </div>

        {/* ---------- DESKTOP MENU ---------- */}
        <ul className="hidden md:flex gap-8 font-medium items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer transition-all ${
                isActive
                  ? darkMode
                    ? "text-orange-400"
                    : "text-blue-600"
                  : darkMode
                  ? "hover:text-orange-400"
                  : "hover:text-blue-600"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/bills"
            className={({ isActive }) =>
              `cursor-pointer transition-all ${
                isActive
                  ? darkMode
                    ? "text-orange-400"
                    : "text-blue-600"
                  : darkMode
                  ? "hover:text-orange-400"
                  : "hover:text-blue-600"
              }`
            }
          >
            Bills
          </NavLink>

          {user ? (
            <NavLink
              to="/myPaybills"
              className={({ isActive }) =>
                `cursor-pointer transition-all ${
                  isActive
                    ? darkMode
                      ? "text-orange-400"
                      : "text-blue-600"
                    : darkMode
                    ? "hover:text-orange-400"
                    : "hover:text-blue-600"
                }`
              }
            >
              My Pay Bills
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `cursor-pointer transition-all ${
                    isActive
                      ? darkMode
                        ? "text-orange-400"
                        : "text-blue-600"
                      : darkMode
                      ? "hover:text-orange-400"
                      : "hover:text-blue-600"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/auth/register"
                className={({ isActive }) =>
                  `cursor-pointer transition-all ${
                    isActive
                      ? darkMode
                        ? "text-orange-400"
                        : "text-blue-600"
                      : darkMode
                      ? "hover:text-orange-400"
                      : "hover:text-blue-600"
                  }`
                }
              >
                Register
              </NavLink>
            </>
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
                className="w-13 h-13 rounded-full border border-gray-400 shadow-md cursor-pointer object-cover"
              />
              <div className="absolute left-1/2 -translate-x-1/2 top-12 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {user?.displayName || "User"}
              </div>
            </div>
          )}

          {user && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <FiLogOut /> Logout
            </button>
          )}
        </ul>

        {/* ---------- MOBILE RIGHT SIDE ---------- */}
        <div className="flex items-center gap-3 md:hidden">
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

      {/* ---------- MOBILE MENU ---------- */}
      {menuOpen && (
        <div
          className={`md:hidden ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
          } shadow-lg px-6 py-4 space-y-3 transition-all duration-300`}
        >
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:pl-2 transition-all"
          >
            Home
          </NavLink>
          <NavLink
            to="/bills"
            onClick={() => setMenuOpen(false)}
            className="block hover:pl-2 transition-all"
          >
            Bills
          </NavLink>
          {user && (
            <NavLink
              to="/myPaybills"
              onClick={() => setMenuOpen(false)}
              className="block hover:pl-2 transition-all"
            >
              My Pay Bills
            </NavLink>
          )}

          <div className="flex items-center justify-between mt-3">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                <FiLogOut /> Logout
              </button>
            ) : (
              <NavLink to="/auth/login">
                <button className="w-1/3 bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 text-sm">
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
