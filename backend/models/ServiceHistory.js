const mongoose = require("mongoose");

const ServiceHistorySchema = new mongoose.Schema({
  service: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Completed", "Pending"], default: "Pending" },
  mechanic: { type: String, default: "Pending Assignment" },
  location: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: null },
}, { timestamps: true });

module.exports = mongoose.model("ServiceHistory", ServiceHistorySchema);