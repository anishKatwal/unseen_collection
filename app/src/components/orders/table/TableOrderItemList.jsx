import {
  clearOrder,
  decreaseQuantity,
  increaseQuantity,
} from "../../../redux/order/orderSlice";
import { createTableOrder } from "../../../api/order";
import { IoCog } from "react-icons/io5";
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";
import { TABLE_ORDERS_ROUTE } from "../../../constants/routes";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RemoveFromOrder from "./RemoveFromOrder";

const TableOrderItemList = () => {
  const { menuItems, totalPrice, tableNumber } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function createOrder() {
    const data = {
      orderNumber: crypto.randomUUID(),
      tableNumber: tableNumber,
      items: menuItems.map((item) => ({
        menuItem: item.id,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice,
    };

    createTableOrder(data)
      .then(() => {
        toast.success(`Order created successfully.`, {
          autoClose: 500,
          onClose: () => {
            navigate(TABLE_ORDERS_ROUTE);
            dispatch(clearOrder());
          },
        });
      })
      .catch((error) => toast.error(error.response.data, { autoClose: 500 }));
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.N
              </th>
              <th colSpan={2} scope="col" className="px-6 py-3">
                Item Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                <IoCog className="inline-block" />
              </th>
            </tr>
          </thead>
          <tbody>
            {menuItems.length == 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-red-300">
                  No item added.
                </td>
              </tr>
            ) : (
              menuItems.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 border-gray-200"
                >
                  <td className="px-6 py-4">{index + 1}.</td>
                  <th
                    scope="row"
                    colSpan={2}
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">Rs. {item.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        className="px-2 h-4 disabled:text-gray-500"
                        onClick={() => dispatch(decreaseQuantity(item))}
                        disabled={item.quantity <= 1}
                      >
                        <LuCircleMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 h-4 disabled:text-gray-500"
                        onClick={() => dispatch(increaseQuantity(item))}
                        disabled={item.quantity >= 5}
                      >
                        <LuCirclePlus />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    Rs. {item.price * item.quantity}
                  </td>
                  <td className="px-6 py-4">
                    <RemoveFromOrder item={item} />
                  </td>
                </tr>
              ))
            )}
            <tr>
              <td colSpan={4}></td>
              <td className="px-6 py-4 font-semibold">Grand total:</td>
              <td className="px-6 py-4 font-semibold">Rs. {totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between py-5">
        <button
          disabled={menuItems.length == 0}
          onClick={() => dispatch(clearOrder())}
          className="bg-gray-600 hover:bg-gray-800 text-white px-8 py-1 h-8 rounded cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Clear items
        </button>
        <button
          disabled={menuItems.length == 0}
          onClick={createOrder}
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-1 h-8 rounded cursor-pointer disabled:bg-green-500 disabled:cursor-not-allowed"
        >
          Create order
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default TableOrderItemList;
