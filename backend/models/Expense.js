const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    notes: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", expenseSchema);