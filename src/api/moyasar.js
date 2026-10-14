import axios from "axios";

const SECRET_KEY = "sk_test_kwW3KyBPm7AUdwLUWZ2txMPirULPrxmJq4zv5ogD";

export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post("https://api.moyasar.com/v1/payments",
      paymentData,
      {
        headers: {
          Authorization: `Basic ${window.btoa(`${SECRET_KEY}:`)}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Payment Error:", error.response?.data || error.message);
    throw error;
  }
};