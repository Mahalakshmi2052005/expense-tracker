const Expense = require("../models/Expense");

// Add new expense
const createExpense = async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.json({ message: "Expense Added Successfully", expense });
    } catch (error) {
        console.error("Create Expense Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all expenses
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        console.error("Get Expenses Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createExpense, getExpenses };