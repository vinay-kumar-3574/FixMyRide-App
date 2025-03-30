const express = require("express");
const AssistanceRequest = require("../models/AssistanceRequest");
const router = express.Router();

// Submit Assistance Request
router.post("/request", async (req, res) => {
  try {
    const { userId, requestType, vehicle, issue, contactMethod, location } = req.body;
    
    const newRequest = new AssistanceRequest({
      userId,
      requestType,
      vehicle,
      issue,
      contactMethod,
      location,
    });

    await newRequest.save();
    res.status(201).json({ success: true, message: "Request submitted successfully", request: newRequest });
  } catch (error) {
    console.error("Error submitting request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get User Assistance Requests
router.get("/requests/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await AssistanceRequest.find({ userId });
    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;