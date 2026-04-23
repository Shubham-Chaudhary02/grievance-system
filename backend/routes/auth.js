const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json("User exists");

    const hashed = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashed });
    await user.save();

    res.json("Registered");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("Invalid email");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json("Wrong password");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret123"
    );

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;