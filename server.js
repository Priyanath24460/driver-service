require("dotenv").config(); // Load .env variables
const express = require("express");
const connectDB = require("./config/db");
const driverRoutes = require("./routes/driverRoutes");

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use driver routes
app.use("/api/driver", driverRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Driver Service running on port ${PORT}`);
});
