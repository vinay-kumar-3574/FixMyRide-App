require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
require("./config/passport"); // Import Passport config
const userRoutes = require("./routes/userRoutes");


const authRoutes = require("./routes/auth");  
const protectedRoutes = require("./routes/protected");
const onboardingRoutes = require("./routes/onboarding");
const vehicleRoutes = require("./routes/vehicle");
const serviceHistoryRoutes = require("./routes/serviceHistoryRoutes");
const assistanceRoutes = require("./routes/assistanceRoutes");

const app = express();

// ✅ CORS: Allow frontend to communicate with backend
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors({ origin: CLIENT_URL, credentials: true }));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// ✅ Routes
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/onboarding", onboardingRoutes);
app.use("/api", userRoutes); 
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/service-history", serviceHistoryRoutes);
app.use("/api/assistance", assistanceRoutes);
app.post("/api/location", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    await LocationModel.create({ latitude, longitude });
    res.status(201).json({ message: "Location saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save location" });
  }
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
