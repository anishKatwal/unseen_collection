import mongoose from "mongoose";
import { ROLE_ADMIN, ROLE_EMPLOYEE, ROLE_USER } from "../constants/roles.js";

const userSchema = new mongoose.Schema({
  address: String,
  createdAt: { type: Date, default: Date.now() },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String },
  password: { type: String, required: true },
  profileImageUrl: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  roles: {
    type: [String],
    enum: [ROLE_ADMIN, ROLE_EMPLOYEE, ROLE_USER],
    default: [ROLE_USER],
  },
});

export default mongoose.model("User", userSchema);
