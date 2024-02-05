const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });

  return res.json({ balance: parseFloat(account.balance.toString()) });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;

  const senderAccount = await Account.findOne({
    userId: req.userId,
  }).session(session);

  console.log(senderAccount.balance);

  if (senderAccount.balance < amount) {
    session.abortTransaction();
    return res.status(400).json({ message: "Insufficient balance" });
  }

  const recieverAccount = await Account.findOne({
    userId: to,
  }).session(session);

  console.log(recieverAccount.balance);

  if (!recieverAccount) {
    session.abortTransaction();
    return res.status(400).json({ message: "Invalid user" });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  session.commitTransaction();
  return res.status(200).json({ message: "Transfer succesful" });
});

module.exports = router;
