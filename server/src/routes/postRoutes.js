const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  getMyPosts,
} = require("../controllers/postControllers");
const validateRole = require("../middleware/validateRole");

router.get("/", authMiddleware, validateRole("reader"), getAllPosts);
router.post("/", authMiddleware, validateRole("author"), createPost);
router.get("/my-posts", authMiddleware, validateRole("author"), getMyPosts);
router.get("/:id", authMiddleware, getPost);
router.patch("/:id", authMiddleware, validateRole("author"), updatePost);
router.delete("/:id", authMiddleware, validateRole("author"), deletePost);

module.exports = router;
