import { decreaseQuantity, increaseQuantity } from "../../redux/cart/cartSlice";
import { IoCog } from "react-icons/io5";
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import CheckoutItems from "../../components/cart/Checkout";
import RemoveFromCart from "../../components/cart/RemoveFromCart";

const CartItems = () => {
  const { menuItems, totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor">
          Your cart ({menuItems.length} items)
        </h2>

        <div className="py-5">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-sm text-left">S.N</th>
                <th colSpan={2} className="p-2 text-sm text-left">
                  Item Name
                </th>
                <th className="p-2 text-sm text-center">Price</th>
                <th className="p-2 text-sm text-center">Quantity</th>
                <th className="p-2 text-sm text-right">Total</th>
                <th className="p-2 text-lg text-center">
                  <IoCog className="inline-block" />
                </th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{index + 1}.</td>
                  <td className="p-2" colSpan={2}>
                    <div className="flex items-center">{item.name}</div>
                  </td>
                  <td className="p-2 text-center">{item.price}</td>
                  <td className="p-2 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        className="px-2 h-4 disabled:text-gray-500"
                        onClick={() => dispatch(decreaseQuantity(item))}
                        disabled={item.quantity <= 1}
                      >
                        <LuCircleMinus />
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        className="px-2 h-4 disabled:text-gray-500"
                        onClick={() => dispatch(increaseQuantity(item))}
                        disabled={item.quantity >= 5}
                      >
                        <LuCirclePlus />
                      </button>
                    </div>
                  </td>
                  <td className="p-2 text-right">
                    {item.price * item.quantity}
                  </td>
                  <td className="p-2 text-center">
                    <RemoveFromCart item={item} />
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan={6}>
                  <div className="h-8">
                    {menuItems.length == 0 && (
                      <div className="text-center">Cart is empty</div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={4}></td>
                <td className="font-semibold text-sm text-right">
                  Grand Total:
                </td>
                <td className="text-right">${totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CheckoutItems disabled={menuItems.length === 0} />
      </div>
    </section>
  );
};

export default CartItems;
