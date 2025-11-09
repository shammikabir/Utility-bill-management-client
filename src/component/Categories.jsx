import React, { useContext } from "react";

import { FiWifi, FiSmartphone, FiDroplet, FiHome, FiZap } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import ThemeContext from "../ThemeContext/ThemeContext";

const Categories = () => {
  const { darkMode } = useContext(ThemeContext);
  const categories = [
    {
      image:
        "https://cdn3.iconfinder.com/data/icons/energy-and-power-3d-illustration-set/512/Energy.png",
      title: "Electricity Bill",
      description: "Pay your electricity bills instantly and securely.",
    },

    {
      image:
        "https://cdn3d.iconscout.com/3d/premium/thumb/gas-bill-payment-10167366-8240166.png",
      title: "Gas Bill",
      description: "Pay gas bills in one click and never miss due dates.",
    },

    {
      image:
        "https://cdn3d.iconscout.com/3d/premium/thumb/internet-3d-icon-download-in-png-blend-fbx-gltf-file-formats--world-logo-browser-earth-globe-user-interface-pack-icons-5600769.png",
      title: "Internet Bill",
      description: "Keep your connection active with fast online payment.",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/previews/022/955/542/original/3d-icon-water-purification-isolated-on-the-transparent-background-png.png",
      title: "Water Bill",
      description: "Manage your water payments with ease.",
    },
  ];
  return (
    <div>
      <section
        className={`py-16  md:px-12 transition-colors  duration-500 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-4xl font-bold text-center mb-10 libre-baskerville-bold ">
          Choose Your <span className="text-blue-600">Category</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12 mx-auto">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden shadow-md cursor-pointer transition transform hover:scale-105 hover:shadow-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-blue-100 hover:bg-blue-50"
              }`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-35 h-32 mx-auto"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg libre-baskerville-bold  mb-1">
                  {cat.title}
                </h3>
                <p className="text-sm opacity-80">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;
