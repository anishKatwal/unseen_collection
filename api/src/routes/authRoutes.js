import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:userId", resetPassword);

router.post("/logout", logoutUser);

export default router;
