const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const authMiddleware = require("./middleware/authMiddleware");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");


const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
// Routes
app.use("/api/auth", authRoutes);
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
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
console.log("Key Prefix:", process.env.GEMINI_API_KEY?.substring(0, 10));