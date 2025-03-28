import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

router.get("/", [auth], getAllCategories);

router.get("/:id", [auth], getCategoryById);

router.post("/", [auth], createCategory);

router.put("/:id", [auth], updateCategory);

router.delete("/:id", [auth, roleBasedAuth(ROLE_ADMIN)], deleteCategory);

export default router;
