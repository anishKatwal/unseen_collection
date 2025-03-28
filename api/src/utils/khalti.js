import axios from "axios";

async function requestKhalti({
  returnUrl,
  websiteUrl,
  totalAmount,
  orderId,
  orderName,
  customerInfo: { name, email, phone },
}) {
  const requestBody = {
    return_url: returnUrl,
    website_url: websiteUrl,
    amount: totalAmount,
    purchase_order_id: orderId,
    purchase_order_name: orderName,
    customer_info: {
      name,
      email,
      phone,
    },
  };

  try {
    const response = await axios.post(
      process.env.KHALTI_API_URL,
      requestBody,
      {
        headers: {
          Authorization: `key ${process.env.KHALTI_LIVE_SECRET_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export default requestKhalti;
