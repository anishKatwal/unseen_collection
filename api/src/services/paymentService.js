import Payment from "../models/Payment.js";

const confirmPayment = async (data) => {
  return await Payment.create(data);
};

export default { confirmPayment };
