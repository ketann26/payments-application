const jwt = require("jsonwebtoken");

let JWT_SECRET;
if (process.env.NODE_ENV === "production") {
  JWT_SECRET = process.env.JWT_SECRET;
  console.log("In production mode");
} else {
  JWT_SECRET = require("./config").JWT_SECRET;
  console.log("In dev mode");
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json();
  }
};

module.exports = { authMiddleware };
