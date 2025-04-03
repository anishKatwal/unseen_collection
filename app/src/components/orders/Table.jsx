import { deleteOrder, getOrders } from "../../api/order";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { RxDotFilled } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import OrderStatus from "./Status";
import Spinner from "../Spinner";

function OrdersTable() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isStatusUpdated, setIsStatusUpdated] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function confirmDeleteOrder() {
    deleteOrder(selectedOrder?.id)
      .then(() => {
        toast.success("Order deleted successfully", { autoClose: 500 });
        setIsStatusUpdated(true);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setSelectedOrder(null);
        setIsOpen(false);
      });
  }

  useEffect(() => {
    if (!isStatusUpdated) return;

    getOrders()
      .then((data) => setOrders(data))
      .catch((error) => toast.error(error.response?.data, { autoClose: 1500 }))
      .finally(() => {
        setLoading(false);
        setIsStatusUpdated(false);
      });
  }, [isStatusUpdated, selectedOrder]);

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
            <th scope="col" className="px-6 py-3">
              Order Number
            </th>
            <th scope="col" className="px-8 py-3">
              Menu Items
            </th>
            <th scope="col" className="px-6 py-3">
              Total price
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              <HiOutlineCog6Tooth className="w-full h-4 text-center" />
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="bg-white border-b border-gray-200 hover:bg-gray-50 "
            >
              <td className="px-6 py-4 text-gray-900">{order.orderNumber}</td>
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
                <OrderStatus orderStatus={order.status} orderId={order.id} />
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
