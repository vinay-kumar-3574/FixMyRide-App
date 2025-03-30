const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Onboarding = require("../models/Onboarding");
const router = express.Router();

// ✅ Middleware to Authenticate JWT Token
const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

// ✅ Protected Route - Get User Profile
router.get("/profile", async (req, res) => {
    try {
        const email = req.query.email?.toLowerCase(); // ✅ Ensure correct email from query

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // ✅ Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Find onboarding details using email
        const onboarding = await Onboarding.findOne({ email });
        if (!onboarding) {
            console.log("⚠️ No onboarding data found for:", email); // Debugging
        }

        // ✅ Combine User + Onboarding Data
        const profileData = {
            name: user.name,
            email: user.email,
            contactNumber: onboarding?.contactNumber || "",
            profilePicture: onboarding?.profilePicture || "",
            vehicleType: onboarding?.vehicleType || "",
            vehicleModel: onboarding?.vehicleModel || "",
            licensePlate: onboarding?.licensePlate || "",
            location: onboarding?.location || "",
            latitude: onboarding?.latitude || "N/A",
            longitude: onboarding?.longitude || "N/A",
            createdAt: user.createdAt
        };

        console.log("✅ Sending Profile Data:", profileData); // Debugging log
        res.json(profileData);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
