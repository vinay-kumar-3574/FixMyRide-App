const mongoose = require("mongoose");

const AssistanceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  requestType: { type: String, enum: ["roadside", "maintenance"], required: true },
  vehicle: { type: String, required: true },
  issue: { type: String, required: true },
  contactMethod: { type: String, enum: ["phone", "email"], required: true },
  location: { type: Object, required: true }, // { lat: Number, lng: Number }
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("AssistanceRequest", AssistanceRequestSchema);