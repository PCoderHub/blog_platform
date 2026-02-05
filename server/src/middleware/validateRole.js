const validateRole = (role) => (req, res, next) => {
  if (role !== req.user.role) {
    throw Object.assign(new Error("Unauthorized for this action!"), {
      statusCode: 401,
    });
  }

  next();
};

module.exports = validateRole;
