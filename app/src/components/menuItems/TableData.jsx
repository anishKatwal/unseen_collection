import { EDIT_MENU_ITEM_ROUTE } from "../../constants/routes";
import { editMenuItem } from "../../api/menuItem";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const MenuItemTableData = ({
  id,
  index,
  name,
  category,
  price,
  isActive,
  deleteAction,
}) => {
  const [isItemActive, setIsItemActive] = useState(isActive);

  function updateStatus() {
    setIsItemActive(!isItemActive);

    editMenuItem(id, { isActive: !isItemActive })
      .then(() => {
        toast.success(`${name} status update successful.`, {
          autoClose: 500,
        });
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 1000 });
      });
  }

  return (
    <>
      <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
        <td className="px-6 py-4">{index + 1}.</td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
        >
          {name}
        </th>
        <td className="px-6 py-4">{category}</td>
        <td className="px-6 py-4">${price}</td>
        <td className="px-6 py-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isItemActive}
              onChange={updateStatus}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 " />
          </label>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="flex items-center justify-center">
            <Link
              to={`${EDIT_MENU_ITEM_ROUTE}/${id}`}
              className="font-medium text-blue-600 hover:underline"
            >
              Edit
            </Link>
            <span className="px-1">|</span>
            {deleteAction}
          </div>
        </td>
      </tr>
    </>
  );
};

export default MenuItemTableData;
