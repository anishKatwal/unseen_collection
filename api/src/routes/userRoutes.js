import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCustomers,
  getEmployees,
  getUserById,
  updateProfileImage,
  updateUser,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth, {
  allowAdminOrSelf,
} from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_EMPLOYEE } from "../constants/roles.js";

const router = express.Router();

router.get("/", [auth, roleBasedAuth(ROLE_ADMIN)], getAllUsers);

router.get("/customers", [auth, roleBasedAuth(ROLE_EMPLOYEE)], getCustomers);

router.get("/employees", [auth, roleBasedAuth(ROLE_ADMIN)], getEmployees);

router.get("/:id", [auth, allowAdminOrSelf], getUserById);

router.post("/", [auth, roleBasedAuth(ROLE_EMPLOYEE)], createUser);

router.put("/:id", [auth, allowAdminOrSelf], updateUser);

router.delete("/:id", [auth, roleBasedAuth(ROLE_ADMIN)], deleteUser);

router.put("/:id/profile-image", [auth, allowAdminOrSelf], updateProfileImage);

export default router;
