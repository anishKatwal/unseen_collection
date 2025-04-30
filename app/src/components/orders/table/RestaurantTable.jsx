import { useNavigate } from "react-router-dom";
import { ADD_TABLE_ORDERS_ROUTE } from "../../../constants/routes";
import { useDispatch } from "react-redux";
import { setTableNumber } from "../../../redux/order/orderSlice";

const ChairDown = () => {
  return (
    <div>
      <div className="bg-slate-800 h-2 rounded-full"></div>
      <div className="bg-linear-to-r from-gray-800 via-gray-500 to-gray-800 h-6 rounded-lg mt-[0.15rem]"></div>
    </div>
  );
};

const ChairUp = () => {
  return (
    <div>
      <div className="bg-linear-to-r from-gray-800 via-gray-500 to-gray-800 h-6 rounded-lg mb-[0.15rem]"></div>
      <div className="bg-slate-800 h-2 rounded-full"></div>
    </div>
  );
};

const RestaurantTable = ({ tableNumber, items, totalPrice, status }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function createOrderForTable() {
    dispatch(setTableNumber(tableNumber));
    navigate(ADD_TABLE_ORDERS_ROUTE);
  }

  return (
    <div
      className="bg-white rounded-xl w-full p-3"
      onClick={createOrderForTable}
    >
      <div className="grid grid-cols-2 gap-5 mb-2">
        <ChairDown />
        <ChairDown />
      </div>

      <div className="bg-radial from-zinc-700 to-zinc-950 min-h-32 w-full rounded-xl text-white px-3 py-2 hover:scale-105 transition-all">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold">Table No. {tableNumber}</h3>
          {status && (
            <span className="bg-green-100 text-green-800 text-[0.5rem] font-medium me-2 px-2.5 py-0.5 rounded-sm uppercase">
              {status}
            </span>
          )}
        </div>
        {items?.length > 0 && (
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="p-1 text-start">Item</th>
                <th className="text-center">Quantity</th>
                <th className="p-1 text-end">Price</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td className="px-1">{item.menuItem.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="px-1 text-end">Rs. {item.price}</td>
                </tr>
              ))}

              <tr className="border-t border-t-zinc-600">
                <td className="p-1" colSpan={2}>
                  Total:
                </td>
                <td className="text-end p-1">Rs. {totalPrice}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5 mt-2">
        <ChairUp />
        <ChairUp />
      </div>
    </div>
  );
};

export default RestaurantTable;
