const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const auth = require("../middleware/authMid");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

router.use(auth);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const line_items = req.body.items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.food.name,
          },
          unit_amount: item.food.price * 100,
        },
        quantity: item.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/pay-success",
      cancel_url: "http://localhost:3000/cart",
    });
    res.send(session.id);
  })
);

module.exports = router;
