const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// CREATE NEW ORDER
router.post("/", async (req, res) => {
    try {
        const {
            customerName,
            mobile,
            address,
            city,
            pincode,
            paymentMethod,
            products,
            total
        } = req.body;

        const newOrder = new Order({
            customerName,
            mobile,
            address,
            city,
            pincode,
            paymentMethod,
            products,
            total
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order: savedOrder
        });

    } catch (error) {
        console.log("Order Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to place order",
            error: error.message
        });
    }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            orders
        });

    } catch (error) {
        console.log("Fetch Orders Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });
    }
});

module.exports = router;