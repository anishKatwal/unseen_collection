import {
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_COMPLETED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "../constants/orderStatus.js";
import { formatOrderData } from "../helpers/dataFormatter.js";
import Order from "../models/Order.js";
import requestKhalti from "../utils/khalti.js";
import paymentService from "./paymentService.js";

const getAll = async (query) => {
  const reqQuery = query?.status ? { status: query.status } : {};

  const orders = await Order.find(reqQuery)
    .sort({ createdAt: -1 })
    .populate("items.menuItem")
    .exec();

  return orders.map((order) => formatOrderData(order));
};

const getOrdersByUser = async (query, userId) => {
  const status = query?.status || ORDER_STATUS_PENDING;

  const orders = await Order.find({ status, customer: userId })
    .sort({ createdAt: -1 })
    .populate("items.menuItem")
    .exec();

  return orders.map((order) => formatOrderData(order));
};

const getOrderById = async (id) => {
  const order = await Order.findById(id).populate("items.menuItem").exec();

  if (!order)
    throw {
      statusCode: 404,
      message: "Order not found.",
    };

  return formatOrderData(order);
};

const createOrder = async (input, userId) => {
  const order = await Order.create({ ...input, createdBy: userId });

  return order;
};

const updateOrder = async (id, input) => {
  const order = await Order.findByIdAndUpdate(id, input);

  return order;
};

const confirmOrder = async (id, data) => {
  const order = await Order.findById(id);

  if (order.status == ORDER_STATUS_CONFIRMED)
    throw {
      statusCode: 400,
      message: "Order already confirmed.",
    };

  if (!data || !data.transactionId)
    throw {
      message: "Unable to process payment.",
    };

  if (data?.status.toLocaleLowerCase() != "completed")
    throw {
      message: "Unable to complete payment.",
    };

  await paymentService.confirmPayment({
    amount: order.totalPrice,
    order: order.id,
    paymentMethod: "online",
    status: "completed",
    transactionId: data.transactionId,
  });

  return await Order.findByIdAndUpdate(
    id,
    {
      status: ORDER_STATUS_CONFIRMED,
    },
    { new: true }
  );
};

const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

const deleteOrder = async (id) => {
  const order = await Order.findById(id);

  if (!order)
    throw {
      statusCode: 404,
      message: "Order not found.",
    };

  return await Order.findByIdAndDelete(id);
};

const checkoutOrder = async (id, input, user) => {
  const order = await Order.findById(id);

  if (order.status == ORDER_STATUS_CONFIRMED)
    throw {
      statusCode: 400,
      message: "Order already confirmed.",
    };

  if (order.status == ORDER_STATUS_SHIPPED)
    throw {
      statusCode: 400,
      message: "Order already shipped.",
    };

  if (order.status == ORDER_STATUS_COMPLETED)
    throw {
      statusCode: 400,
      message: "Order already completed.",
    };

  await Order.findByIdAndUpdate(id, {
    shippingAddress: user.address,
  });

  return await requestKhalti({
    customerInfo: user,
    orderId: id,
    orderName: order.orderNumber,
    ...input,
  });
};

export default {
  checkoutOrder,
  confirmOrder,
  createOrder,
  deleteOrder,
  getAll,
  getOrderById,
  getOrdersByUser,
  updateOrder,
  updateOrderStatus,
};
