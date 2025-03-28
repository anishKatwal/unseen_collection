import { ORDER_STATUS_PENDING } from "../../constants/orderStatus";
import ConfirmOrder from "./Confirm";
import pizza from "../../assets/images/pizza.png";

function OrdersCard({ order, status }) {
  return (
    <div className="border border-gray-400 rounded-2xl my-5 bg-gray-50 ">
      <div className="flex items-center justify-between m-6">
        <div>
          <p className="text-gray-700  text-sm">OrderId</p>
          <h5 className="font-semibold ">#{order.orderNumber}</h5>
        </div>
        <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10">
          {order.status}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 m-6">
        {order.items.map((item, index) => {
          if (!item?.menuItem) return;

          return (
            <div
              key={index}
              className="flex items-center gap-5 py-3 px-5 rounded-xl border border-gray-400"
            >
              <img
                src={item.menuItem.imageUrls[0] ?? pizza}
                alt={item.menuItem.name}
                height={100}
                width={100}
                className="h-24 w-auto"
              />
              <div>
                <h5 className="font-semibold text-xl">{item.menuItem.name}</h5>
                <p className="text-sm">
                  ${item.price} (x {item.quantity})
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-slate-200 rounded-b-2xl py-3 px-5 flex justify-between items-center">
        <p>
          Total price:
          <span className="font-semibold ml-2">${order.totalPrice}</span>
        </p>
        <div className={status == ORDER_STATUS_PENDING ? "block" : "hidden"}>
          <ConfirmOrder order={order} />
        </div>
      </div>
    </div>
  );
}

export default OrdersCard;
