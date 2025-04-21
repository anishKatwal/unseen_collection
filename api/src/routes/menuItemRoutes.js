import express from "express";
import {
  getAllMenuItems,
  createMenuItem,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemsByCategory,
} from "../controllers/menuItemController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_EMPLOYEE } from "../constants/roles.js";

const router = express.Router();

router.get("/", getAllMenuItems);

router.get("/category/:category", getMenuItemsByCategory);

router.get("/:id", getMenuItemById);

router.post("/", auth, roleBasedAuth(ROLE_EMPLOYEE), createMenuItem);

router.put("/:id", auth, roleBasedAuth(ROLE_EMPLOYEE), updateMenuItem);

router.delete("/:id", auth, roleBasedAuth(ROLE_ADMIN), deleteMenuItem);

export default router;
