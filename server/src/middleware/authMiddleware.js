const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw Object.assign(new Error("Unauthorized!"), { statusCode: 401 });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      throw Object.assign(new Error("Unauthorized token!"), {
        statusCode: 401,
      });
    }
  }
};

module.exports = authMiddleware;
