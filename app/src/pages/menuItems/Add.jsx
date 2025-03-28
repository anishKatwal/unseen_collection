import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MENU_ITEM_LIST_ROUTE } from "../../constants/routes";
import MenuItemForm from "../../components/menuItems/Form";
import Title from "../../components/Title";

const AddMenuItem = () => {
  return (
    <section className="py-10 bg-slate-100 min-h-svh px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <Link to={MENU_ITEM_LIST_ROUTE} className="flex items-center">
          <BiLeftArrowAlt className="mr-1" />
          Back
        </Link>

        <div className="md:w-2/3 xl:w-1/2 mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-textColor">
            Add Menu item
          </h2>
          <MenuItemForm />
        </div>
      </div>
    </section>
  );
};

export default AddMenuItem;
