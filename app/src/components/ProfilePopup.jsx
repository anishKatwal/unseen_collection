import { clearCart } from "../redux/cart/cartSlice";
import { ImUser } from "react-icons/im";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/auth/authSlice";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useState } from "react";
import popupMenu from "../constants/popupMenu";

const ProfilePopup = ({ user }) => {
  const [showProfile, setShowProfile] = useState(false);

  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUser());
    dispatch(clearCart());
  }

  return (
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
        }  w-screen h-svh fixed top-0 left-0`}
        onClick={() => setShowProfile(false)}
      >
        <div
          className={`w-44 py-3 px-3 rounded-xl bg-gray-100 absolute top-12 right-10 shadow z-50`}
        >
          <h3 className="px-2 font-semibold ">Hi! {user.name}</h3>

          <div className="py-2">
            {popupMenu.map(
              ({ route, label, role }) =>
                user.roles.includes(role) && (
                  <Link
                    key={route}
                    to={route}
                    className="bg-slate-200 hover:bg-slate-300 text-black w-full rounded text-sm py-1 px-2 flex items-center justify-start my-1"
                  >
                    {label}
                  </Link>
                )
            )}
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
  );
};

export default ProfilePopup;
