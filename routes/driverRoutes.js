const express = require("express");
const { registerDriver , loginDriver,getDriverDetails} = require("../controllers/driverController");

const router = express.Router();


//Register a new driver
router.post("/register", registerDriver);

// Driver login 
router.post("/login", loginDriver);

// Get driver details by ID
router.get("/:id", getDriverDetails);

module.exports = router;