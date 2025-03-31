const Driver = require("../models/driverModel");
const axios = require("axios");

const registerDriver = async (req, res) => {
    try {
        const { name, email, phone, password, vehicleType } = req.body;

        const role = 'Driver';

        // Check if driver already exists
        const existingDriver = await Driver.findOne({ email });
        if (existingDriver) {
            return res.status(400).json({ message: "Driver already exists" });
        }

        // Save driver details in driverDB
        const newDriver = new Driver({ name, email, phone, vehicleType,role });
        await newDriver.save();

        // Send email & password to auth-service for authentication
        const authResponse = await axios.post("http://auth-service:5002/api/auth/register", { email, password,role });

        if (authResponse.status === 201) {
            res.status(201).json({ message: "Driver registered successfully" });
        } else {
            res.status(500).json({ message: "Driver registered, but authentication failed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error registering driver", error: error.message });
    }
};

const loginDriver = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Send email & password to auth-service for login
        const authResponse = await axios.post("http://auth-service:5002/api/auth/login", { email, password });

        if (authResponse.status === 200) {
            const token = authResponse.data.token;
            res.json({ message: "Login successful", token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

const getDriverDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await Driver.findById(id);

        if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
        }

        res.json(driver);
    } catch (error) {
        res.status(500).json({ message: "Error fetching driver details", error: error.message });
    }
};


module.exports = { registerDriver, loginDriver,getDriverDetails };
