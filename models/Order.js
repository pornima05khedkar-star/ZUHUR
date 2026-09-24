const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true
        },

        mobile: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        pincode: {
            type: String,
            required: true
        },

        paymentMethod: {
            type: String,
            default: "Cash on Delivery"
        },

        products: {
            type: Array,
            required: true
        },

        total: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);