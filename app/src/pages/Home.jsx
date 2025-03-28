import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import background from "../assets/images/homepic.avif";
import { getAllMenuItems } from "../api/menuItem";
import { MENU_ITEMS_ROUTE } from "../constants/routes";
import "./home.css";  // Import the CSS file

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getAllMenuItems().then((response) => {
      console.log("Menu Items:", response.data);
      setMenuItems(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col text-white text-center">
      {/* Background Image Below Navbar */}
      <div
        className="relative h-[40vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="relative flex-1 flex items-center justify-center">
          <div className="p-10 rounded-2xl shadow-3xl max-w-lg bg-black bg-opacity-70 h-60">
            <h1 className="text-5xl font-extrabold mb-4 text-red-600">Welcome to Fast Food POS</h1>
            <p className="text-lg mb-6 text-gray-200">
              Manage orders, track sales, and enhance efficiency with our modern POS system.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Slider for Menu Items */}
      <div className="mx-16 px-10 mt-10 mb-20">
        <Link to={MENU_ITEMS_ROUTE}>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            Our Menus
          </button>
        </Link>
        <div className="overflow-hidden border-2 border-gray-300 rounded-lg shadow-xl p-4 relative">
          <div className="flex space-x-6 animate-scroll whitespace-nowrap">
            {menuItems.length > 0 ? (
              menuItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-white text-black p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl inline-block w-1/4 min-w-[240px]"
                >
                  <img
                    src={
                      item.imageUrls && item.imageUrls.length > 0
                        ? item.imageUrls[0]
                        : "/placeholder.jpg"
                    }
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md mb-3 border border-gray-200"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-red-500 font-bold">${item.price}</p>
                </div>
              ))
            ) : (
              <p className="text-black">Loading menu items...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
