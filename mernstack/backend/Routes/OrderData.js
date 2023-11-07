const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Orders");
const router = express.Router();

router.post("/orderData", async (req, res) => {
  try {
    const { email, order_data, order_date } = req.body;

    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create({
        email,
        order_data: [{ Order_date: order_date, ...order_data }],
      });
    } else {
      existingOrder.order_data.push({ Order_date: order_date, ...order_data });
      await existingOrder.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    const { email } = req.body;
    const myData = await Order.findOne({ email });

    if (myData) {
      res.json({ orderData: myData });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
