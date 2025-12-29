const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Get all users (admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  const users = await User.find({}, "name email role");
  res.json(users);
});

// Delete user (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Make user admin
router.put("/:id/make-admin", protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.role = "admin";
  await user.save();

  res.json({ message: "User promoted to admin" });
});
 
module.exports = router;
