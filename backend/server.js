const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test Route (VERY IMPORTANT for checking)
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api/grievances", require("./routes/grievance"));

// PORT FIX (IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});