import mongoose from "mongoose";

const employeeScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("EmployeeSchedule", employeeScheduleSchema);
