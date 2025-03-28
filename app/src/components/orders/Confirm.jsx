import { checkoutOrder } from "../../api/order";
import { toast } from "react-toastify";
import { useState } from "react";
import config from "../../config/config";
import Modal from "../Modal";

function ConfirmOrder({ order }) {
  const [loading, setLoading] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  function onClickConfirm() {
    setShowConfirmPopup(true);
  }

  async function confirmOrder() {
    setLoading(true);

    try {
      const data = await checkoutOrder(order.id, {
        returnUrl: `${config.appUrl}/orders/${order.id}/payment`,
        totalAmount: order.totalPrice,
        websiteUrl: config.appUrl,
      });

      window.location.href = data.payment_url;
    } catch (error) {
      toast.error(error.response.data, { autoClose: 1500 });
    } finally {
      setLoading(false);
      setShowConfirmPopup(false);
    }
  }

  return (
    <>
      <button
        className={`rounded bg-blue-600 px-4 py-1 text-white shadow hover:bg-blue-700`}
        onClick={onClickConfirm}
      >
        Confirm Order
      </button>
      <Modal
        label={"Confirm order"}
        isOpen={showConfirmPopup}
        setIsOpen={setShowConfirmPopup}
        body={
          <div className="text-left">
            <p>Are you sure you want to confirm this order?</p>
            OrderId: <strong>#{order.orderNumber}</strong>
          </div>
        }
        actions={
          <div className="flex items-center justify-between pt-2 w-full">
            <button
              className="px-5 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
              onClick={() => setShowConfirmPopup(false)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 bg-green-700 hover:bg-green-800 text-white rounded disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={confirmOrder}
            >
              Confirm
            </button>
          </div>
        }
      />
    </>
  );
}

export default ConfirmOrder;
