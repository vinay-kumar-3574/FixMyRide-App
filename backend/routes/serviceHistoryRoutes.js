const express = require("express");
const ServiceHistory = require("../models/ServiceHistory");
const serviceRouter = express.Router();

// Get all service history records
serviceRouter.get("/", async (req, res) => {
  try {
    const history = await ServiceHistory.find();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new service record
serviceRouter.post("/", async (req, res) => {
  try {
    const newRecord = new ServiceHistory(req.body);
    await newRecord.save();
    res.json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = serviceRouter;