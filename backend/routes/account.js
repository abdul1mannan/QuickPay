const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { number } = require("zod");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  res.json({ balance: account.balance });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
 
  session.startTransaction();

  try {
   
    const { toUserId, amount } = req.body;
 
    if (!toUserId || typeof amount !== "number" || !amount || amount <= 0) {
      console.log(toUserId, amount);
      return res.json({
        message: "invalid input",
      });
    }
  
    const fromAccount = await Account.findOne({ userId: req.userId });
    const toAccount = await Account.findOne({ userId: toUserId });
  
    if (!fromAccount || !toAccount) {
      session.abortTransaction();
      session.endSession();
      return res.json({
        message: "account not found",
      });
    }

    if (fromAccount.balance < amount) {
      session.abortTransaction();
      session.endSession();
      return res.json({
        message: "insufficient balance",
      });
    }
    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save({ session });
    await toAccount.save({ session });

    await session.commitTransaction();
    res.json({ message: "Transfer successful" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    res.json({ message: "Transfer failed" });
  } finally {
    session.endSession();
  }
});
module.exports = router;
