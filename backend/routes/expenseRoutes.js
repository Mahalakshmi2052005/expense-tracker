const express = require("express");
const router = express.Router();
const { createExpense, getExpenses } = require("../controllers/expenseController");
const Expense = require("../models/Expense");

// Add expense
router.post("/add", createExpense);

// Get all expenses
router.get("/", getExpenses);

// Update expense
router.put("/:id", async (req, res) => {
    console.log("PUT request body:", req.body);
    console.log("PUT request id:", req.params.id);
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after' }
        );
        if (!updatedExpense) return res.status(404).json({ error: "Expense not found" });
        res.json(updatedExpense);
    } catch (error) {
        console.error("Update Expense Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Delete expense
router.delete("/:id", async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) return res.status(404).json({ error: "Expense not found" });
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Delete Expense Error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;