const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    vehicleType: { type: String },
    location: {
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 }
    },
    status: { type: String, enum: ["available", "busy", "offline"], default: "offline" },
    role: { type: String} 
});

module.exports = mongoose.model("Driver", driverSchema);
