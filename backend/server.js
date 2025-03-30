require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const path = require('path');
require("./config/passport"); // Import Passport config
const userRoutes = require("./routes/userRoutes");
const MongoStore = require('connect-mongo');

const authRoutes = require("./routes/auth");  
const protectedRoutes = require("./routes/protected");
const onboardingRoutes = require("./routes/onboarding");
const vehicleRoutes = require("./routes/vehicle");
const serviceHistoryRoutes = require("./routes/serviceHistoryRoutes");
const assistanceRoutes = require("./routes/assistanceRoutes");

const app = express();

// ✅ CORS: Allow frontend to communicate with backend
const CLIENT_URL = process.env.CLIENT_URL || "https://fixmyride-app.onrender.com";
app.use(cors({ 
  origin: CLIENT_URL, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Session Store Configuration
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
  ttl: 24 * 60 * 60,
  crypto: {
    secret: process.env.SESSION_SECRET
  }
});

// Handle store errors
store.on('error', function(error) {
  console.error('❌ Session Store Error:', error);
});

// ✅ Session Configuration
const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // Enable for HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none' // Required for cross-site requests
  },
  name: 'sessionId',
  rolling: true,
  unset: 'destroy',
  proxy: true
};

app.use(session(sessionOptions));

// ✅ Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

// ✅ API Routes
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

// ✅ Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../dashboard1/velocihelp-center-main/dist')));

// ✅ Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dashboard1/velocihelp-center-main/dist/index.html'));
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log("✅ MongoDB Connected Successfully");
})
.catch(err => {
  console.error("❌ MongoDB Connection Error:", err);
  process.exit(1);
});

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', err => {
  console.error('❌ MongoDB Connection Error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB Disconnected');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
