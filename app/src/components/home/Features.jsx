import { FaPaypal, FaShippingFast } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";

function Features() {
  return (
    <div className="py-10 bg-slate-100 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10  max-w-screen-xl mx-auto">
        <div className="flex justify-start items-center bg-slate-800 text-white w-full py-4 px-6">
          <BiSolidDish className="h-10 w-10 p-2 rounded-full bg-white text-black" />
          <h3 className="ml-3 font-semibold">Quality Food</h3>
        </div>
        <div className="flex justify-start items-center bg-slate-800 text-white w-full py-4 px-6">
          <MdRestaurantMenu className="h-10 w-10 p-2 rounded-full bg-white text-black" />
          <h3 className="ml-3 font-semibold">Online Reservations</h3>
        </div>
        <div className="flex justify-start items-center bg-slate-800 text-white w-full py-4 px-6">
          <FaShippingFast className="h-10 w-10 p-2 rounded-full bg-white text-black" />
          <h3 className="ml-3 font-semibold">Free Delivery</h3>
        </div>
        <div className="flex justify-start items-center bg-slate-800 text-white w-full py-4 px-6">
          <FaPaypal className="h-10 w-10 p-2 rounded-full bg-white text-black" />
          <h3 className="ml-3 font-semibold">Online Payment</h3>
        </div>
      </div>
    </div>
  );
}

export default Features;
