import express from "express";
import {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
} from "../controllers/employeeScheduleController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

router.get("/", [auth], getAllSchedules);

router.get("/:id", [auth], getScheduleById);

router.post("/", [auth, roleBasedAuth(ROLE_ADMIN)], createSchedule);

router.put("/:id", [auth, roleBasedAuth(ROLE_ADMIN)], updateSchedule);

router.delete("/:id", [auth, roleBasedAuth(ROLE_ADMIN)], deleteSchedule);

export default router;
