const express = require("express");
const expenseModel = require("../models/expense.model");
const authMiddleware = require("../middlware/auth.middleware");
const expenseRouter = express.Router();

expenseRouter.post("/expenses", authMiddleware, async (req, res) => {
  try {
    await expenseModel.create({...req.body, userId: req.user.id });
    res.status(201).json({ message: "expense added" });
  } catch (error) {
    res.status(500).json({ message: "failed to add expense", error:error.message });
  }
});

expenseRouter.get("/expenses", authMiddleware, async (req, res) => {
  try {
    // // Correct — returns only logged in user's expenses
    const expenses = await expenseModel.find({userId: req.user.id});
    res.status(201).json({ message: "expenses list", expenses: expenses });
  } catch (error) {
    res.status(500).json({ message: "failed to fetch expenses" });
  }
});


expenseRouter.delete("/expenses/:id", authMiddleware, async (req, res) => {
  try {
    
    await expenseModel.findByIdAndDelete(req.params.id );
    res.status(200).json({ message: "expenses deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "failed to fetch expenses" });
  }
});

module.exports = expenseRouter;
