const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const auth = require("../middleware/authMid");
const { BAD_REQUEST } = require("../constants/httpSatus");
const OrderModel = require("../models/orderModel");
const OrderStatus = require("../constants/orderStatus");
router.use(auth);
router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const order = req.body;
    console.log(order);
    if (order.items.length <= 0) res.status(BAD_REQUEST).send("Cart Is Empty!");
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });
    const newOrder = new OrderModel({...order,user:req.user.id});
    await newOrder.save();
    res.send(newOrder);
  })
);

module.exports = router;
