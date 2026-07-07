const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  getGithubProfile,
} = require("../controllers/profileController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.get("/github", protect, getGithubProfile);
module.exports = router;