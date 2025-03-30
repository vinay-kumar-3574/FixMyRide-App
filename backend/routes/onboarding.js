const express = require("express");
const mongoose = require("mongoose");
const Onboarding = require("../models/Onboarding"); // Import the model

const router = express.Router();

// ✅ Save onboarding details (Fixed Route)
router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming Onboarding Data:", req.body); // Debugging
    const newOnboarding = new Onboarding(req.body);
    await newOnboarding.save();
    console.log("✅ Onboarding data saved:", newOnboarding); // Debugging
    res.status(201).json({ message: "Onboarding data saved successfully." });
  } catch (error) {
    console.error("❌ Onboarding error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});


module.exports = router;
