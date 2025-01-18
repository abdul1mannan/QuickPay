const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader || !authheader.startsWith("Bearer ")) {
    return res.json({
      message: "invalid token",
    });
  }

  const token = authheader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
    } else {
      return res.json({
        message: "invalid token",
      });
    }

    next();
  } catch (err) {
    return res.json({
      message: "invalid token",
    });
  }
};
module.exports = {
  authMiddleware,
};
