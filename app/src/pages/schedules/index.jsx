import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { enUS } from "date-fns/locale/en-US";
import { deleteSchedule, getSchedules } from "../../api/employeeSchedule";
import { parseISO, startOfWeek, format, parse, getDay } from "date-fns";
import { useState, useEffect } from "react";
import {
  ADD_SCHEDULE_ROUTE,
  EDIT_MENU_ITEM_ROUTE,
  EDIT_SCHEDULE_ROUTE,
} from "../../constants/routes";
import { Link } from "react-router-dom";
import { RiAddLargeLine } from "react-icons/ri";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const locales = {
  en: enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const SchedulesPage = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date()); // Track the current date
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);

    setIsOpen(true);
  };

  function onDeleteSchedule() {
    deleteSchedule(selectedEvent?.id)
      .then(() => toast.success("Event delete successful.", { autoClose: 500 }))
      .catch((error) => toast.error(error.response?.data, { autoClose: 1500 }))
      .finally(() => {
        setIsOpen(false);
        setSelectedEvent(null);
      });
  }

  useEffect(() => {
    if (selectedEvent) return;

    getSchedules()
      .then((res) => {
        const formattedEvents = res.data.map((schedule) => ({
          id: schedule.id,
          title: schedule.user.name,
          start: parseISO(schedule.startDateTime),
          end: parseISO(schedule.endDateTime),
        }));

        setEvents(formattedEvents);
      })
      .catch((error) => console.log(error));
  }, [selectedEvent]);

  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor">
            Staff Schedules
          </h2>

          <Link
            to={ADD_SCHEDULE_ROUTE}
            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2 flex items-center"
          >
            Create new schedule
            <RiAddLargeLine className="ml-2" />
          </Link>
        </div>

        <div className="py-5">
          <Calendar
            date={currentDate}
            endAccessor="end"
            events={events}
            localizer={localizer}
            onNavigate={setCurrentDate}
            onView={setView}
            startAccessor="start"
            style={{ minHeight: 500 }}
            view={view}
            views={["month", "week", "day"]}
            className="rounded-md bg-white py-6 px-8 text-sm h-svh"
            selectable
            onSelectEvent={handleSelectEvent}
            components={{
              header: (props) => <div className="py-2">{props.label}</div>,
            }}
          />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        label={`Schedule of ${selectedEvent?.title}`}
        body={
          selectedEvent && (
            <div>
              <p>
                Start Date & Time:
                <span className="ml-2">{format(selectedEvent?.start, "yyyy-MM-dd HH:mm")}</span>
              </p>
              <p>
                End Date & Time:
                <span className="ml-2">{format(selectedEvent?.end, "yyyy-MM-dd HH:mm")}</span>
              </p>
            </div>
          )
        }
        actions={
          <div className="flex items-center justify-between pt-2 w-full">
            <Link
              to={`${EDIT_SCHEDULE_ROUTE}/${selectedEvent?.id}`}
              className="px-5 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
            >
              Update
            </Link>
            <button
              onClick={onDeleteSchedule}
              className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </div>
        }
      />
    </section>
  );
};

export default SchedulesPage;
