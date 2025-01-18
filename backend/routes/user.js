const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

const signupschema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupschema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "email already taken/incorrect inputs",
    });
  }
  let user = await User.findOne({ username: body.username });
  if (user && user._id) {
    return res.status(400).json({
      message: "email already taken",
    });
  }

  user = await User.create(body);
  const account = await Account.create({
    userId: user._id,
    balance: 1 + Math.random() * 1000,
  });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(200).json({
    message: "user created",
    token: token,
  });
});

const loginschema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = loginschema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });
  if (!user || !user._id) {
    return res.json({
      message: "userdonotexist",
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({
    message: "user logged in",
    token: token,
  });
});

const updatebody = z.object({
  password: z.string().optional(),
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  try {
    const body = req.body;
    const { success } = updatebody.safeParse(req.body);
    if (!success) {
      return res.json({
        message: "incorrect inputs",
      });
    }
    await User.updateOne({ _id: req.userId }, body);
    res.json({
      message: "updated",
    });
  } catch (err) {
    return res.json({
      message: "not authorized",
    });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    _id: { $ne: req.userId },
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
      { email: { $regex: filter, $options: "i" } },
      { username: { $regex: filter, $options: "i" } },
    ],
  });

  res.json({
    user: users.map((user) => ({
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    })),
  });
});

module.exports = router;
