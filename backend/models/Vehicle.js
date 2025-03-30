const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  name: String,
  year: Number,
  licensePlate: String,
  lastService: String,
  image: String,
  type: String,
  status: String,
});

module.exports = mongoose.model("Vehicle", VehicleSchema);