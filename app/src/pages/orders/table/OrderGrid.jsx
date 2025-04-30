import {
  ADD_TABLE_ORDERS_ROUTE,
  TABLE_ORDERS_ROUTE,
} from "../../../constants/routes";
import { getOrders } from "../../../api/order";
import { IoListOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RiAddLargeLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import config from "../../../config/config";
import RestaurantTable from "../../../components/orders/table/RestaurantTable";

function TableOrdersGrid() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders({ isTableOrder: true, sort: { createdAt: -1 } })
      .then((data) => setOrders(data))
      .catch((error) => toast.error(error.response?.data, { autoClose: 1500 }));
  }, []);

  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex mb-5 justify-between items-center">
          <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor">
            Table Orders
          </h2>

          <div className="flex">
            <Link
              to={TABLE_ORDERS_ROUTE}
              className="text-white bg-blue-600 border border-gray-300 hover:bg-blue-700 font-medium rounded-lg text-sm px-2 py-1 flex items-center"
            >
              <IoListOutline className="w-5 h-5" />
            </Link>
            <Link
              to={ADD_TABLE_ORDERS_ROUTE}
              className="text-gray-900 ml-2 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2 flex items-center"
            >
              Create Table Order
              <RiAddLargeLine className="ml-2" />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
          {Array.from(
            { length: config.totalTables },
            (_, tableNum) => tableNum + 1
          ).map((num) => {
            const order = orders.find(
              (orderItem) => orderItem.tableNumber == num
            );

            return <RestaurantTable key={num} tableNumber={num} {...order} />;
          })}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default TableOrdersGrid;
