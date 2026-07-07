const User = require("../models/User");
const axios = require("axios");

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { bio, skills, githubUsername } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        bio,
        skills,
        githubUsername,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get GitHub Profile
const getGithubProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.githubUsername) {
      return res.status(400).json({
        success: false,
        message: "GitHub username not found",
      });
    }

    const githubRes = await axios.get(
      `https://api.github.com/users/${user.githubUsername}`
    );

    res.status(200).json({
      success: true,
      github: githubRes.data,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "GitHub fetch failed",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getGithubProfile,
};