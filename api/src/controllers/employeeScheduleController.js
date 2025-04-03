import scheduleService from "../services/employeeScheduleService.js";

const getAllSchedules = async (req, res) => {
  try {
    const data = await scheduleService.getAllSchedules();

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getScheduleById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await scheduleService.getScheduleById(id);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const createSchedule = async (req, res) => {
  try {
    const input = req.body;

    if (!input.user) return res.status(422).send("Employee id is required.");
    if (!input.startDateTime)
      return res.status(422).send("Start datetime is required.");
    if (!input.endDateTime)
      return res.status(422).send("End datetime is required.");

    const data = await scheduleService.createSchedule(input);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateSchedule = async (req, res) => {
  try {
    const id = req.params.id;
    const input = req.body;

    const data = await scheduleService.updateSchedule(id, input);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteSchedule = async (req, res) => {
  const id = req.params.id;

  try {
    await scheduleService.deleteSchedule(id);

    res.send("Schedule deleted successfully.");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
};
