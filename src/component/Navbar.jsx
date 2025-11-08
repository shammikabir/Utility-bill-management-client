import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { GiLotus } from "react-icons/gi"; // Logo Icon
import { FaUserCircle } from "react-icons/fa"; // User Icon
import { AuthContext } from "../Provider/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="shadow-md sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="w-11/12 md:w-10/12 mx-auto flex justify-between items-center py-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <GiLotus className="text-[#B24D34]" size={34} />
          <h1 className="text-2xl font-serif text-[#133D31]">
            <span className="font-extrabold text-[#B24D34]">Yoga</span>Nest
          </h1>
        </div>
        {/* user checinh */}

        <h1>{user?.email}</h1>

        {/* Center: NavLinks (Desktop) */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "text-[#B24D34] border-b-2 border-[#B24D34]"
                    : "text-[#133D31] hover:text-[#B24D34]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right: User Icon */}
        <div className="hidden md:block">
          <FaUserCircle
            size={34}
            className="text-[#133D31] hover:text-[#B24D34] cursor-pointer transition-all duration-300"
          />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          <FaUserCircle
            size={30}
            className="text-[#133D31] hover:text-[#B24D34] cursor-pointer"
          />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <HiX size={28} className="text-[#133D31]" />
            ) : (
              <HiMenuAlt3 size={28} className="text-[#133D31]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#F5EDE6] p-4 space-y-3 text-center border-t border-gray-300">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-lg font-medium transition-all duration-300 ${
                  isActive ? "text-[#B24D34]" : "text-[#133D31]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
