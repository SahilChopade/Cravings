import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
export const checkout = async (order) => {
  try {
    const stripe = await loadStripe(
      "pk_test_51OQraWSExvvyLuvLiZ3wmLGGoujahJzurF3ow5qNiu4RXLA9yRwb8RXgo2wr6eh0lKVZOJjGIXRUgaieuiCqO5Sn00b0INZv7g"
    );
    const { data } = await axios.post(
      "/api/pay/",
      order
    );
    // console.log("this is my response data", data);
    stripe.redirectToCheckout({ sessionId: data });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
