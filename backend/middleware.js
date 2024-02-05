const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV == "production") {
  const JWT_SECRET = process.env.JWT_SECRET;
} else {
  const { JWT_SECRET } = require("./config");
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
