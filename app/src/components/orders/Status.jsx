import React from "react";
import {
  ORDER_STATUS_COMPLETED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "../../constants/orderStatus";
import { updateOrderStatus } from "../../api/order";
import { toast } from "react-toastify";

const orderStatuses = [
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_SHIPPED,
  ORDER_STATUS_COMPLETED,
];

const OrderStatus = ({ orderId, orderStatus }) => {
  function updateStatus(e) {
    const status = e.target.value;

    updateOrderStatus(orderId, status)
      .then(() =>
        toast.success(`Status updated to ${status}`, { autoClose: 500 })
      )
      .catch((error) => toast.error(error.response.data, { autoClose: 500 }));
  }

  return (
    <select
      defaultValue={orderStatus}
      onChange={updateStatus}
      className="bg-gray-100 border border-gray-300 text-gray-900 text-[0.65rem] rounded block px-1.5 py-1 uppercase"
    >
      {orderStatuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default OrderStatus;
