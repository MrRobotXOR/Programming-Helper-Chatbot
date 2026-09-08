const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Database
connectDB();

// CORS
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (
        origin === "http://localhost:5173" ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
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
  console.log(`🚀 Server running on ${PORT}`);
});