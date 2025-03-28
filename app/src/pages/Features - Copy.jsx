import { FaCertificate, FaRegCreditCard, FaShippingFast } from "react-icons/fa";
import { MdAssignmentReturn } from "react-icons/md";

function Features() {
  return (
    <div className="py-10 bg-slate-100 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10  max-w-screen-xl mx-auto">
        <div className="flex justify-evenly items-center bg-slate-800 text-white w-full py-4 px-6">
          <FaShippingFast className="h-12 w-12 p-2 rounded-full bg-white text-black" />
          <h3 className="ml-3 text-xl font-semibold">Free Shipping</h3>
        </div>
        <div className="flex justify-evenly items-center bg-slate-800 text-white w-full py-4 px-6">
          <FaRegCreditCard className="h-12 w-12 p-2 rounded-full bg-white text-black" />
          <h3 className="ml-3 text-xl font-semibold">Card Payment</h3>
        </div>
        <div className="flex justify-evenly items-center bg-slate-800 text-white w-full py-4 px-6">
          <FaCertificate className="h-12 w-12 p-2 rounded-full bg-white text-black" />
          <h3 className="ml-3 text-xl font-semibold">Authentic Products</h3>
        </div>
        <div className="flex justify-evenly items-center bg-slate-800 text-white w-full py-4 px-6">
          <MdAssignmentReturn className="h-12 w-12 p-2 rounded-full bg-white text-black" />
          <h3 className="ml-3 text-xl font-semibold">Easy Return</h3>
        </div>
      </div>
    </div>
  );
}

export default Features;
