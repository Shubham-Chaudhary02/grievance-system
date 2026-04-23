const express = require("express");
const Grievance = require("../models/Grievance");
const auth = require("../middleware/auth");

const router = express.Router();

// Create
router.post("/", auth, async (req, res) => {
  const g = new Grievance(req.body);
  await g.save();
  res.json(g);
});

// Get all
router.get("/", auth, async (req, res) => {
  const data = await Grievance.find();
  res.json(data);
});

// Get by ID
router.get("/:id", auth, async (req, res) => {
  const g = await Grievance.findById(req.params.id);
  res.json(g);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const g = await Grievance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(g);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

// Search
router.get("/search/title", auth, async (req, res) => {
  const data = await Grievance.find({
    title: { $regex: req.query.title, $options: "i" },
  });
  res.json(data);
});

module.exports = router;