import { confirmOrder } from "../../api/order";
import { ORDERS_ROUTE } from "../../constants/routes";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

const OrderPayment = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();

  async function getOrderConfirmation() {
    try {
      const orderId = params.id;
      const status = searchParams.get("status");
      const transactionId = searchParams.get("transaction_id");

      await confirmOrder(orderId, status, transactionId);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigate(ORDERS_ROUTE);
      }, 1500);
    }
  }

  useEffect(() => {
    getOrderConfirmation();
  }, []);

  return (
    <div className="py-8 px-2 sm:p-10">
      {loading ? (
        <div className="rounded-2xl bg-slate-100 p-10">
          <h3 className="text-center text-xl md:text-3xl text-textColor">
            Verifying payment
          </h3>
          <div className="flex items-center justify-center p-10">
            <Spinner height="h-10" width="w-10" />
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-red-100 p-10">
          <h3 className="text-center text-xl md:text-3xl text-textColor">
            Payment failed
          </h3>
          <div className="flex items-center justify-center p-10">{error} </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-green-100 p-10">
          <h3 className="text-center text-xl md:text-3xl text-textColor">
            Payment success
          </h3>
        </div>
      )}
    </div>
  );
};

export default OrderPayment;
