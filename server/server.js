const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const authMiddleware = require("./middleware/authMiddleware");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Database
connectDB();

// Allowed Frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https://programminghelperchatbotm.vercel.app",
  "https://programminghelperchatbotm-git-main-mrrobotxors-projects.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed",
    userId: req.user.id,
  });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Programming Helper API Running 🚀",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});