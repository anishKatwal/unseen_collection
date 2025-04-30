import { deleteOrder } from "../../api/order";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "../Modal";

function DeleteOrder({ order }) {
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  function onClickDelete() {
    setShowDeletePopup(true);
  }

  async function confirmDelete() {
    setLoading(true);

    try {
      await deleteOrder(order.id);

      toast.success("Order deleted successfully.", {
        autoClose: 500,
        onClose: () => window.location.reload(),
      });
    } catch (error) {
      toast.error(error.response.data, { autoClose: 1500 });
    } finally {
      setLoading(false);
      setShowDeletePopup(false);
    }
  }

  return (
    <>
      <button
        className={`rounded bg-red-600 px-4 py-1 text-white shadow hover:bg-red-700 ml-2`}
        onClick={onClickDelete}
      >
        Delete Order
      </button>
      <Modal
        label={"Delete order"}
        isOpen={showDeletePopup}
        setIsOpen={setShowDeletePopup}
        body={
          <div className="text-left">
            <p>Are you sure you want to delete this order?</p>
            OrderId: <strong>#{order.orderNumber}</strong>
          </div>
        }
        actions={
          <div className="flex items-center justify-between pt-2 w-full">
            <button
              className="px-5 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded"
              onClick={() => setShowDeletePopup(false)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        }
      />
    </>
  );
}

export default DeleteOrder;
