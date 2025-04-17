// controllers/tableController.js
const TableOrder = require('../models/TableOrder');

// ✅ GET all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await TableOrder.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET a single order
const getOrderById = async (req, res) => {
  try {
    const order = await TableOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ CREATE a new order
const createOrder = async (req, res) => {
  try {
    const order = new TableOrder(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ UPDATE an order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await TableOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ DELETE an order
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await TableOrder.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
