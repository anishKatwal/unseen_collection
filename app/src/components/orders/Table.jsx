import { deleteOrder, getOrders } from "../../api/order";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { RxDotFilled } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import OrderStatus from "./Status";
import Spinner from "../Spinner";
import { format } from "date-fns";
import {
  RiArrowDownLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
} from "react-icons/ri";

function OrdersTable({ columns, isTableOrder = false }) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isStatusUpdated, setIsStatusUpdated] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState({ createdAt: -1 });

  function confirmDeleteOrder() {
    deleteOrder(selectedOrder?.id)
      .then(() => {
        toast.success("Order deleted successfully", { autoClose: 500 });
        setIsStatusUpdated(true);
      })
      .catch((error) => toast.error(error.response.data, { autoClose: 500 }))
      .finally(() => {
        setSelectedOrder(null);
        setIsOpen(false);
      });
  }

  function updateSort(field) {
    setSort({ [field]: sort[field] == 1 ? -1 : 1 });
  }

  useEffect(() => {
    const query = { sort };

    if (isTableOrder) {
      query.isTableOrder = true;
    } else {
      query.customer = true;
    }

    getOrders(query)
      .then((data) => setOrders(data))
      .catch((error) => toast.error(error.response?.data, { autoClose: 1500 }))
      .finally(() => {
        setLoading(false);
        setIsStatusUpdated(false);
      });
  }, [isStatusUpdated, selectedOrder, sort, isTableOrder]);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spinner className="h-16 w-16" />
      </div>
    );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 mb-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-800">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.slug}
                scope="col"
                className="px-6 py-3 hover:cursor-pointer hover:text-gray-800"
                title="sort"
                onClick={() => column.sortable && updateSort(column.slug)}
              >
                <p className="flex items-center">
                  <span className="mr-1">{column.label}</span>
                  {sort[column.slug] ? (
                    sort[column.slug] == 1 ? (
                      <RiArrowUpLine />
                    ) : (
                      <RiArrowDownLine />
                    )
                  ) : column.sortable ? (
                    <RiArrowUpDownLine />
                  ) : null}
                </p>
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              <HiOutlineCog6Tooth className="w-full h-4 text-center" />
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={index}
              className="bg-white border-b border-gray-200 hover:bg-gray-50 "
            >
              {isTableOrder ? (
                <td className="px-6 py-4 font-bold">{order.tableNumber}</td>
              ) : (
                <>
                  <td className="px-6 py-4 text-gray-900">{index + 1}.</td>
                  <td className="px-6 py-4">{order.customer?.name}</td>
                </>
              )}
              <td className="px-6 py-4">
                {order.items.map((item, index) => {
                  if (!item?.menuItem) return;

                  return (
                    <div key={index} className="flex items-center">
                      <RxDotFilled />
                      <span className="whitespace-nowrap">
                        {item.menuItem.name}
                      </span>
                      <span className="text-[0.6rem] ml-2 whitespace-nowrap">
                        x {item.quantity}
                      </span>
                    </div>
                  );
                })}
              </td>
              <td className="px-6 py-4">{order.totalPrice}</td>
              <td className="px-6 py-4">
                {format(order.createdAt, "dd MMM, yyyy")}
              </td>
              <td className="px-6 py-4">
                <OrderStatus
                  orderStatus={order.status}
                  orderId={order.id}
                  isTableOrder={isTableOrder}
                />
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedOrder(order);
                  }}
                  className="text-red-600 bg-red-100 px-3 py-1 rounded hover:bg-blue-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />

      <Modal
        label={"Delete order"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        body={
          <div className="text-left">
            <p>Are you sure you want to delete this order?</p>
            OrderId: <strong>#{selectedOrder?.orderNumber}</strong>
          </div>
        }
        actions={
          <div className="flex items-center justify-between pt-2 w-full">
            <button
              className="px-5 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={confirmDeleteOrder}
            >
              Confirm
            </button>
          </div>
        }
      />
    </div>
  );
}

export default OrdersTable;
