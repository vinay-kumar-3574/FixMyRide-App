const mongoose = require("mongoose");

const OnboardingSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // ✅ Add email field
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  profilePicture: { type: String }, // Store URL or file path
  vehicleType: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  licensePlate: { type: String },
  location: { type: String, required: true }, // ✅ Store full address or Lat/Lng
  latitude: { type: Number, required: false }, // ✅ Store latitude
  longitude: { type: Number, required: false }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Onboarding", OnboardingSchema);
