import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { SCHEDULES_ROUTE } from "../../constants/routes";
import SchedulesForm from "../../components/schedules/Form";

const CreateSchedule = () => {
  return (
    <section className="py-10 bg-slate-100 min-h-svh px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <Link to={SCHEDULES_ROUTE} className="flex items-center">
          <BiLeftArrowAlt className="mr-1" />
          Back
        </Link>

        <div className="md:w-2/3 xl:w-1/2 mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-textColor">
            Create new schedule
          </h2>
          <SchedulesForm />
        </div>
      </div>
    </section>
  );
};

export default CreateSchedule;
