const cors = require("cors");

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman ya localhost requests ke liye
      if (!origin) return callback(null, true);

      const allowed = [
        "http://localhost:5173",
        "https://programminghelperchatbotm.vercel.app",
      ];

      // Vercel ke saare preview domains allow
      if (
        allowed.includes(origin) ||
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