import Schedule from "../models/EmployeeSchedule.js";
import { formatScheduleData } from "../helpers/dataFormatter.js";

const getAllSchedules = async () => {
  const schedules = await Schedule.find().populate("user").exec();

  return schedules.map((schedule) => formatScheduleData(schedule));
};

const getScheduleById = async (id) => {
  const schedule = await Schedule.findById(id).populate("user").exec();

  if (!schedule)
    throw {
      statusCode: 404,
      message: "Schedule not found.",
    };

  return formatScheduleData(schedule);
};

const createSchedule = async (input) => {
  const schedule = await Schedule.create(input);

  return schedule;
};

const updateSchedule = async (id, input) => {
  const schedule = await Schedule.findById(id);

  if (!schedule)
    throw {
      statusCode: 404,
      message: "Schedule not found.",
    };

  return await Schedule.findByIdAndUpdate(id, input, { new: true });
};

const deleteSchedule = async (id) => {
  const schedule = await Schedule.findById(id);

  if (!schedule)
    throw {
      statusCode: 404,
      message: "Schedule not found.",
    };

  return await Schedule.findByIdAndDelete(id);
};

export default {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
};
