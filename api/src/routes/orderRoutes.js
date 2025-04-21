import express from "express";
import {
  checkoutOrder,
  confirmOrder,
  createOrder,
  createTableOrder,
  deleteOrder,
  getAll,
  getOrderById,
  getOrdersByUser,
  updateOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_EMPLOYEE } from "../constants/roles.js";

const router = express.Router();

router.get("/", [auth, roleBasedAuth(ROLE_EMPLOYEE)], getAll);

router.get("/users/:userId", auth, getOrdersByUser);

router.get("/:id", auth, getOrderById);

router.post("/", auth, createOrder);

router.post("/table", auth, roleBasedAuth(ROLE_EMPLOYEE), createTableOrder);

router.put("/:id", auth, updateOrder);

router.put("/:id/checkout", auth, checkoutOrder);

router.put("/:id/confirm", auth, confirmOrder);

router.put(
  "/:id/status",
  [auth, roleBasedAuth(ROLE_EMPLOYEE)],
  updateOrderStatus
);

router.delete("/:id", auth, deleteOrder);

export default router;
