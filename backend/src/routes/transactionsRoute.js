import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getSummaryByUserId,
  getTransactionsByUserId,
  getBalanceOverTime,
  getAllTransactions,
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/debug/all", getAllTransactions);
router.get("/:userId", getTransactionsByUserId);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);
router.get("/summary/:userId", getSummaryByUserId);
router.get("/balance-over-time/:userId", getBalanceOverTime);

export default router;
