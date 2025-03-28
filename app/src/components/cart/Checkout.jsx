import { clearCart } from "../../redux/cart/cartSlice";
import { createOrder } from "../../api/order";
import { ORDERS_ROUTE } from "../../constants/routes";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal";

function CheckoutItems({ disabled }) {
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);

  const { menuItems, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function confirmCheckoutItem() {
    try {
      await createOrder({
        items: menuItems.map((item) => ({
          menuItem: item.id,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice,
        customer: user.id,
        orderNumber: crypto.randomUUID(),
      });

      dispatch(clearCart());

      navigate(ORDERS_ROUTE);
    } catch (error) {
      toast.error(error.response?.data);
    }
  }

  return (
    <>
      <button
        disabled={disabled}
        onClick={() => setShowCheckoutPopup(true)}
        className="float-right text-white bg-blue-600 px-10 py-3 flex items-center md:text-xl disabled:opacity-75"
      >
        Checkout
      </button>

      <Modal
        label={"Checkout items"}
        isOpen={showCheckoutPopup}
        setIsOpen={setShowCheckoutPopup}
        body={
          <p className="text-left">
            Are you sure you want to checkout these items?
          </p>
        }
        actions={
          <div className="flex items-center justify-between pt-2 w-full text-white">
            <button
              className="px-5 py-2 bg-gray-500 hover:bg-gray-700  rounded"
              onClick={() => setShowCheckoutPopup(false)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 bg-green-700 hover:bg-green-800  rounded text-white"
              onClick={confirmCheckoutItem}
            >
              Checkout
            </button>
          </div>
        }
      ></Modal>
      <ToastContainer />
    </>
  );
}

export default CheckoutItems;
