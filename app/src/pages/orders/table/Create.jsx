import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { TABLE_ORDERS_ROUTE } from "../../../constants/routes";
import TableOrderItemForm from "../../../components/orders/table/TableOrderItemForm";
import TableOrderItemList from "../../../components/orders/table/TableOrderItemList";

const CreateTableOrder = () => {
  return (
    <section className="py-10 bg-slate-100 min-h-svh px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <Link to={TABLE_ORDERS_ROUTE} className="flex items-center">
          <BiLeftArrowAlt className="mr-1" />
          Back
        </Link>

        <div className="lg:w-2/3 mx-auto px-4 ">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-textColor">
            Create Table Order
          </h2>

          <TableOrderItemForm />

          <TableOrderItemList />
        </div>
      </div>
    </section>
  );
};

export default CreateTableOrder;
