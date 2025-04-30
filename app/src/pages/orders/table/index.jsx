import {
  ADD_TABLE_ORDERS_ROUTE,
  TABLE_ORDERS_GRID_ROUTE,
} from "../../../constants/routes";
import { IoGridOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RiAddLargeLine } from "react-icons/ri";
import OrdersTable from "../../../components/orders/Table";

const columns = [
  {
    label: "Table No.",
    slug: "tableNumber",
    sortable: true,
  },
  {
    label: "Menu items",
    slug: "items",
  },
  {
    label: "Total price",
    slug: "totalPrice",
    sortable: true,
  },
  {
    label: "Created At",
    slug: "createdAt",
    sortable: true,
  },
  {
    label: "Status",
    slug: "status",
  },
];

function TableOrders() {
  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex mb-5 justify-between items-center">
          <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor">
            Table Orders
          </h2>

          <div className="flex">
            <Link
              to={TABLE_ORDERS_GRID_ROUTE}
              className="text-white bg-blue-600 border border-gray-300 hover:bg-blue-700 font-medium rounded-lg text-sm px-2 py-1 flex items-center"
            >
              <IoGridOutline className="w-5 h-5" />
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

        <OrdersTable isTableOrder={true} columns={columns} />
      </div>
    </section>
  );
}

export default TableOrders;
