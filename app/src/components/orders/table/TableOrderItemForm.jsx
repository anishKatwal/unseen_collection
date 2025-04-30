import { addToOrder, setTableNumber } from "../../../redux/order/orderSlice";
import { getAllMenuItems } from "../../../api/menuItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import config from "../../../config/config";

function TableOrderItemForm() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch();

  const { tableNumber } = useSelector((state) => state.order);

  function addItem() {
    if (!selectedItem) return;

    dispatch(addToOrder(selectedItem));
  }

  useEffect(() => {
    getAllMenuItems({ sort: { createdAt: -1 } }).then((response) =>
      setMenuItems(response.data)
    );
  }, []);

  return (
    <div className="w-full px-8 py-6 md:py-8 md:px-12 border border-zinc-300 rounded-xl mt-5 mb-10">
      <h3 className="text-2xl font-semibold">
        Table No.
        <select
          id="tableNumber"
          className="border ml-2 rounded pl-1"
          value={tableNumber}
          onChange={(e) => dispatch(setTableNumber(e.target.value))}
        >
          {Array.from(
            { length: config.totalTables },
            (_, tableNum) => tableNum + 1
          ).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </h3>
      <div className="flex items-end justify-between py-3">
        <div>
          <label
            htmlFor="items"
            className="font-semibold text-sm uppercase p-1"
          >
            Menu Items
          </label>
          <select
            id="items"
            className="border border-gray-500 rounded px-3 py-1 h-8 w-full shadow-md mt-1"
            onChange={(e) => {
              const value = e.target.value;

              if (!value || value == "") return;

              setSelectedItem(JSON.parse(value));
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Select menu item
            </option>
            {menuItems.map((item) => (
              <option
                key={item.id}
                value={JSON.stringify({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                })}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={addItem}
          disabled={!selectedItem}
          className="ml-1 bg-blue-600 hover:bg-blue-800 text-white px-8 py-1 h-8 rounded cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Add item
        </button>
      </div>
    </div>
  );
}

export default TableOrderItemForm;
