const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });


// ================================
// ORDER ROUTE
// ================================

const orderRoutes = require("./routes/orders");

app.use("/api/orders", orderRoutes);


// ================================
// HOME ROUTE
// ================================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// ================================
// TEST API
// ================================

app.get("/api/test", (req, res) => {
    res.json({
        message: "ZUHUR API is working!"
    });
});


// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`ZUHUR server running on http://localhost:${PORT}`);
});