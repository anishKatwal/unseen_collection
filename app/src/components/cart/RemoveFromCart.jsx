import { IoTrashOutline } from "react-icons/io5";
import { removeFromCart } from "../../redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "../Modal";

function RemoveFromCart({ item }) {
  const [selectedItem, setSelectedItem] = useState();
  const [showRemovePopup, setShowRemovePopup] = useState(false);

  const dispatch = useDispatch();

  function removeItem(item) {
    setSelectedItem(item);
    setShowRemovePopup(true);
  }

  function confirmRemoveItem() {
    dispatch(removeFromCart(selectedItem));
    setShowRemovePopup(false);
    setSelectedItem(null);
  }

  return (
    <>
      <button onClick={() => removeItem(item)}>
        <IoTrashOutline className="inline-block text-red-500 hover:text-red-700" />
      </button>
      <Modal
        label={"Remove Item from cart"}
        isOpen={showRemovePopup}
        setIsOpen={setShowRemovePopup}
        body={
          <p className="text-left">
            Are you sure you want to remove <b>{selectedItem?.name}</b> from
            cart?
          </p>
        }
        actions={
          <div className="flex items-center justify-between pt-2 w-full">
            <button
              className="px-5 py-2 bg-zinc-500 hover:bg-red-700 text-white rounded"
              onClick={() => setShowRemovePopup(false)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 bg-red-500 hover:bg-primary-700 text-white rounded"
              onClick={confirmRemoveItem}
            >
              Remove
            </button>
          </div>
        }
      />
    </>
  );
}

export default RemoveFromCart;
