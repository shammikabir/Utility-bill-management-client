import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut, FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import ThemeContext from "../ThemeContext/ThemeContext";
import { AuthContext } from "../Provider/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext); // Change to true after login
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`${
        darkMode
          ? "bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 text-gray-100"
          : "bg-white text-gray-800"
      } transition-colors duration-500 shadow-md`}
    >
      <nav className="flex justify-between items-center w-11/12 mx-auto py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold">
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-xl shadow-md ${
              darkMode
                ? "bg-orange-400 text-gray-900"
                : "bg-blue-600 text-white"
            }`}
          >
            ⚡
          </div>
          <span
            className={`${
              darkMode ? "text-orange-400" : "text-blue-600"
            } tracking-wide`}
          >
            PowerPay
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium items-center">
          {user ? (
            <>
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
              <NavLink
                to="/mypaybills"
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
            </>
          ) : (
            <>
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

          {/* Search Icon */}
          <FiSearch className="text-lg cursor-pointer hover:text-blue-600 transition" />

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-xl p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* Profile or Login */}
          {user ? (
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-3xl cursor-pointer hover:text-orange-400" />
              <button
                // onClick={() => setIsLoggedIn(false)}
                className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Login
              </button>
            </NavLink>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className={`md:hidden ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
          } shadow-lg px-6 py-4 space-y-3 transition-all duration-300`}
        >
          {user ? (
            <>
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
              <NavLink
                to="/mypaybills"
                onClick={() => setMenuOpen(false)}
                className="block hover:pl-2 transition-all"
              >
                My Pay Bills
              </NavLink>
            </>
          ) : (
            <>
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
              <NavLink
                to="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="block hover:pl-2 transition-all"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                onClick={() => setMenuOpen(false)}
                className="block hover:pl-2 transition-all"
              >
                Register
              </NavLink>
            </>
          )}

          <div className="flex items-center justify-between mt-3">
            <button
              onClick={toggleDarkMode}
              className="text-xl p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>

            {user ? (
              <button
                // onClick={() => setIsLoggedIn(false)}
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
