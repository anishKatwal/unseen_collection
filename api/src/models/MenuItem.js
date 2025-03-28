import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  category: { type: String },
  description: { type: String },
  imageUrls: { type: [String], required: false },
  isActive: { type: Boolean, default: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("MenuItem", menuItemSchema);
