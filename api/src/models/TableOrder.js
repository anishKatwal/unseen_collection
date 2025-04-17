// models/TableOrder.js
const mongoose = require('mongoose');
const {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_COMPLETED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_PREPARING,
  ORDER_STATUS_SERVED,
  ORDER_STATUS_SHIPPED,
} = require('../constants/orderStatus');

const orderItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true }
}, { _id: false });

const tableOrderSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  customerName: { type: String },
  status: {
    type: String,
    enum: [
      ORDER_STATUS_PENDING,
      ORDER_STATUS_CONFIRMED,
      ORDER_STATUS_PREPARING,
      ORDER_STATUS_SERVED,
      ORDER_STATUS_SHIPPED,
      ORDER_STATUS_COMPLETED,
      ORDER_STATUS_CANCELLED
    ],
    default: ORDER_STATUS_PENDING
  },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

tableOrderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('TableOrder', tableOrderSchema);
