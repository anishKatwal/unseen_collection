import { BiCart, BiMenu } from "react-icons/bi";
import {
  CART_ITEMS_ROUTE,
  HOME_ROUTE,
  ORDERS_LIST_ROUTE,
  ORDERS_ROUTE,
  PROFILE_ROUTE,
} from "../constants/routes";
import { clearCart } from "../redux/cart/cartSlice";
import { ImUser } from "react-icons/im";
import { IoRestaurant } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/auth/authSlice";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import navMenu from "../constants/navMenu";
import Search from "./Search";
import { ROLE_ADMIN } from "../constants/userRoles";
import adminMenu from "../constants/adminMenu";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { menuItems } = useSelector((state) => state.cart);

  const isAuth = user ? true : false;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "block py-2 pr-4 pl-3 text-white rounded bg-blue-600 lg:bg-transparent lg:text-blue-600 lg:p-0"
      : "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0";

  function logout() {
    dispatch(logoutUser());
    dispatch(clearCart());
  }

  return (
    <header className="sticky top-0 z-50">
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
                <div className="relative">
                  <button
                    className="rounded hover:bg-blue-100 p-2 cursor-pointer"
                    onClick={() => setShowProfile(!showProfile)}
                  >
                    <ImUser className="text-xl rounded-full border border-gray-200" />
                  </button>
                  <div
                    className={`${
                      showProfile ? "block" : "hidden"
                    } w-44 py-3 px-3 rounded-xl bg-gray-100 absolute top-10 right-0 shadow z-20`}
                    onClick={() => setShowProfile(false)}
                  >
                    <h3 className="px-2 font-semibold ">
                      Hi! {user.name}
                    </h3>

                    <div className="py-2">
                      {user.roles.includes(ROLE_ADMIN) &&
                        adminMenu.map(({ route, label }) => (
                          <Link
                            key={route}
                            to={route}
                            className="bg-slate-200 hover:bg-slate-300 text-black w-full rounded text-sm py-1 px-2 flex items-center justify-start my-1"
                          >
                            {label}
                          </Link>
                        ))}
                    </div>

                    <button
                      className="bg-blue-600 text-white w-full rounded py-1 text-sm flex items-center justify-center cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                      <MdLogout className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <button
              className="inline-flex items-center p-2 ml-1 text-sm bg-gray-100 rounded-lg lg:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <BiMenu className="text-xl" />
            </button>
          </div>
          <div
            className={`${
              showMobileMenu ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          >
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
        <div className="block md:hidden mt-2">
          <Search />
        </div>
      </nav>
    </header>
  );
}

export default Header;
