const asyncHandler = require("../middleware/asyncHandler");
const Post = require("../models/Post");

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("user", "name");

  res.status(200).json({
    posts,
  });
});

const createPost = asyncHandler(async (req, res) => {
  const { description } = req.body;

  if (!description) {
    throw Object.assign(new Error("Posts need a title and description!"), {
      statusCode: 400,
    });
  }

  const post = await Post.create({
    description,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully!",
    post,
  });
});

const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });

  res.status(200).json({
    posts,
  });
});

const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    throw Object.assign(new Error("Post not found!"), { statusCode: 404 });
  }

  res.status(200).json({
    post,
  });
});

const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    throw Object.assign(new Error("Post not found!"), { statusCode: 404 });
  }

  res.status(200).json({
    message: "Post updated successfully!",
    post: updatedPost,
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) {
    throw Object.assign(new Error("Post not found!"), { statusCode: 404 });
  }

  res.status(200).json({
    message: "Post deleted successfully!",
  });
});

module.exports = {
  getAllPosts,
  createPost,
  getMyPosts,
  getPost,
  updatePost,
  deletePost,
};
