import { ADD_STAFF_ROUTE } from "../../../constants/routes";
import { Link } from "react-router-dom";
import { RiAddLargeLine } from "react-icons/ri";
import StaffsTable from "../../../components/users/staffs/Table";

const StaffsListPage = () => {
  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex mb-5 justify-between items-center">
          <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor">
            Manage Staffs
          </h2>

          <div className="flex items-center">
            <Link
              to={ADD_STAFF_ROUTE}
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2 flex items-center"
            >
              Add staff
              <RiAddLargeLine className="ml-2" />
            </Link>
          </div>
        </div>

        <StaffsTable />
      </div>
    </section>
  );
};

export default StaffsListPage;
