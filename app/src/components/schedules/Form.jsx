import { createSchedule, updateSchedule } from "../../api/employeeSchedule";
import { format, isAfter, startOfDay } from "date-fns";
import { getStaffs } from "../../api/user";
import { SCHEDULES_ROUTE } from "../../constants/routes";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const SchedulesForm = ({ isEditing = false, schedule }) => {
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [staffs, setStaffs] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      user: schedule ? schedule.user.id : "",
      date: schedule && format(new Date(schedule?.startDateTime), "yyyy-MM-dd"),
      startTime: schedule && format(new Date(schedule?.startDateTime), "HH:mm"),
      endTime: schedule && format(new Date(schedule?.endDateTime), "HH:mm"),
    },
  });

  const navigate = useNavigate();

  async function submitForm(data) {
    setIsUpdating(true);

    const startDateTime = `${data.date} ${data.startTime}`;
    const endDateTime = `${data.date} ${data.endTime}`;

    try {
      isEditing
        ? await updateSchedule(schedule?.id, {
            user: data.user,
            startDateTime,
            endDateTime,
          })
        : await createSchedule({ user: data.user, startDateTime, endDateTime });

      navigate(SCHEDULES_ROUTE);
    } catch (error) {
      toast.error(error.response?.data, { autoClose: 1500 });
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    setLoading(true);

    getStaffs()
      .then((data) => setStaffs(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <form
      className="w-full px-10 py-8 md:px-12 shadow-xl rounded-2xl bg-white mt-5 mb-10"
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="py-2">
        <label htmlFor="user" className="font-semibold text-sm uppercase p-1 ">
          Staff
        </label>
        <select
          id="user"
          {...register("user", {
            required: "Staff is required.",
          })}
          className="border border-gray-500 rounded px-3 py-1 w-full shadow-md mt-1"
        >
          <option disabled value="">
            Select staff
          </option>
          {staffs.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>
          ))}
        </select>

        <p className="text-red-600 text-sm m-1">{errors.user?.message}</p>
      </div>
      <div className="py-2">
        <label htmlFor="date" className="font-semibold text-sm uppercase p-1 ">
          Date
        </label>
        <input
          id="date"
          type="date"
          min={Date.now()}
          max="2050-12-31"
          {...register("date", {
            required: "Date is required.",
            validate: (value) => {
              const today = startOfDay(new Date());
              const selectedDate = startOfDay(new Date(value));

              return (
                isAfter(selectedDate, today) ||
                "Date must be greater than today."
              );
            },
          })}
          className="border border-gray-500 rounded px-3 py-1 w-full shadow-md mt-1"
        />

        <p className="text-red-600 text-sm m-1">{errors.date?.message}</p>
      </div>
      <div className="py-2">
        <label
          htmlFor="startDate"
          className="font-semibold text-sm uppercase p-1 "
        >
          Start time
        </label>
        <input
          id="startTime"
          type="time"
          {...register("startTime", {
            required: "Start time is required.",
          })}
          className="border border-gray-500 rounded px-3 py-1 w-full shadow-md mt-1"
        />

        <p className="text-red-600 text-sm m-1">{errors.startTime?.message}</p>
      </div>
      <div className="py-2">
        <label htmlFor="user" className="font-semibold text-sm uppercase p-1 ">
          End time
        </label>
        <input
          id="endTime"
          type="time"
          {...register("endTime", {
            required: "End time is required.",
          })}
          className="border border-gray-500 rounded px-3 py-1 w-full shadow-md mt-1"
        />

        <p className="text-red-600 text-sm m-1">{errors.endTime?.message}</p>
      </div>
      <div className="flex justify-center pt-5">
        <input
          type="submit"
          disabled={isUpdating}
          value={isEditing ? "Update" : "Create"}
          className="bg-blue-600 hover:bg-blue-800 text-white px-10 py-2 rounded cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
        />
      </div>
    </form>
  );
};

export default SchedulesForm;
