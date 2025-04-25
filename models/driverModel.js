const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nic: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Remember to hash this in production
});

module.exports = mongoose.model("Driver", driverSchema);
