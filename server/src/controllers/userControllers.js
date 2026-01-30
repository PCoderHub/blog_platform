const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw Object.assign(new Error("All fields are required!"), {
      statusCode: 400,
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw Object.assign(new Error("User already exists!!"), {
      statusCode: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw Object.assign(new Error("All fields are required!"), {
      statusCode: 400,
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw Object.assign(new Error("User not found!"), { statusCode: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Object.assign(new Error("Invalid credentials!"), { statusCode: 401 });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );
  res.status(200).json({
    message: "User loggedin successfully!",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User logged out successfully!",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
