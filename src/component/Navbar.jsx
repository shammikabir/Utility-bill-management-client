import { useState, useContext } from "react";
import { FiMenu, FiX, FiSun, FiMoon, FiSearch } from "react-icons/fi";
import ThemeContext from "../ThemeContext/ThemeContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      } w-full shadow-md transition-colors duration-500`}
    >
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold flex items-center gap-2">
          <span
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              darkMode
                ? "bg-orange-400 text-gray-900"
                : "bg-blue-600 text-white"
            }`}
          >
            ⚡
          </span>
          <span className={`${darkMode ? "text-orange-400" : "text-blue-600"}`}>
            PowerPay
          </span>
        </div>

        <ul className="hidden md:flex gap-8 font-medium">
          {["About", "Our Service", "Career", "Partnership", "Contact"].map(
            (item) => (
              <li
                key={item}
                className={`cursor-pointer hover:${
                  darkMode ? "text-orange-400" : "text-blue-600"
                }`}
              >
                {item}
              </li>
            )
          )}
        </ul>

        <div className="hidden md:flex gap-4 items-center">
          <FiSearch className="text-xl cursor-pointer hover:text-blue-600" />
          <button
            onClick={toggleDarkMode}
            className="text-2xl p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Login
          </button>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {menuOpen && (
        <div
          className={`md:hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg px-6 py-4 space-y-4`}
        >
          {["About", "Our Service", "Career", "Partnership", "Contact"].map(
            (item) => (
              <p key={item}>{item}</p>
            )
          )}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Login
          </button>
        </div>
      )}
    </div>
  );
}
