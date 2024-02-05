const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6, "Password should be minimum 6 characters long"),
  firstName: zod.string(),
  lastName: zod.string(),
});

const userUpdateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const parsedPayload = signupSchema.safeParse(req.body);

  if (!parsedPayload.success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.json({
      message: "Email already taken",
    });
  }

  const dbUser = await User.create(req.body);
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );

  await Account.create({
    userId: dbUser._id,
    balance: Math.floor(Math.random() * 1000) + 1,
  });

  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );

      return res.json({
        token: token,
      });
    }

    return res.status(411).json({ message: "Incorrect username/password" });
  } catch (err) {
    console.error("Error during signin:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const parsedPayload = userUpdateSchema.safeParse(req.body);
  if (!parsedPayload.success) {
    res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: { $regex: new RegExp(filter, "i") },
      },
      {
        lastName: { $regex: new RegExp(filter, "i") },
      },
    ],
  }).select("_id firstName lastName");

  return res.json(users);
});

module.exports = router;
