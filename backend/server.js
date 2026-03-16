const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const expenseRouter = require("./routes/expenseRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Debug middleware to see all requests
app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    next();
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/expenseTrackerDB")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Use router
app.use("/api/expenses", expenseRouter);

// Test route
app.get("/", (req, res) => res.send("Expense Tracker Backend Running"));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));