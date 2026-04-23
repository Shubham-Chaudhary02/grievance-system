const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) return res.status(401).json("No token");

  // Bearer ho ya simple token dono handle karega
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = decoded;
    next();
  } catch {
    res.status(401).json("Invalid token");
  }
};