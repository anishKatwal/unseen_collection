import { BiCart, BiMenu, BiX } from "react-icons/bi";
import { CART_ITEMS_ROUTE, HOME_ROUTE } from "../constants/routes";
import { IoRestaurant } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import navMenu from "../constants/navMenu";
import ProfilePopup from "./ProfilePopup";
import Search from "./Search";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { menuItems } = useSelector((state) => state.cart);

  const isAuth = user ? true : false;

  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "block py-2 pr-4 pl-3 text-white rounded bg-blue-600 lg:bg-transparent lg:text-blue-600 lg:p-0"
      : "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0";

  return (
    <header className="sticky top-0 z-30">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 shadow">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
          <Link to={HOME_ROUTE} className="flex items-center">
            <IoRestaurant className="text-2xl mr-2" />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Foodify
            </span>
          </Link>
          <div className="hidden md:block">
            <Search />
          </div>
          <div className="flex items-center lg:order-2">
            {isAuth ? (
              <div className="flex">
                <div className="relative flex items-center mr-1">
                  <button
                    className="rounded hover:bg-blue-100 p-2 cursor-pointer"
                    onClick={() => navigate(CART_ITEMS_ROUTE)}
                  >
                    <BiCart className="text-xl" />
                  </button>
                  {menuItems.length > 0 && (
                    <span className="absolute top-0 right-2 text-[0.6rem] rounded-full text-white bg-red-600 px-1">
                      {menuItems.length}
                    </span>
                  )}
                </div>
                <ProfilePopup user={user} />
              </div>
            ) : null}
            <button
              className="inline-flex items-center p-2 ml-1 text-sm bg-gray-100 rounded-lg lg:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <BiX className="text-xl" />
              ) : (
                <BiMenu className="text-xl" />
              )}
            </button>
          </div>
          <div
            className={`${
              showMobileMenu ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          >
            <div className="block md:hidden mt-2">
              <Search />
            </div>
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {navMenu
                .filter((menu) => menu.auth === isAuth)
                .map((menu) => {
                  return (
                    <li key={menu.label}>
                      <NavLink to={menu.route} className={linkClass}>
                        {menu.label}
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
