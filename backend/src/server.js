import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

// Routes
import productRoutes from "./routes/products.js";
import authRoutes    from "./routes/auth.js";
import cartRoutes    from "./routes/cart.js";
import orderRoutes   from "./routes/orders.js";
import promoRoutes   from "./routes/promo.js";
import quizRoutes    from "./routes/quiz.js";

// Middleware
import { errorHandler } from "./middleware/errorHandler.js";

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ─── Body Parser ──────────────────────────────────────────────────────────────
app.use(express.json());

// ─── Rate Limiting (global) ───────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});
app.use(globalLimiter);

// Stricter limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many auth attempts. Please wait 15 minutes." },
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🌸 Perfume Zone API is running.",
    version: "1.0.0",
    endpoints: {
      products : "/api/products",
      auth     : "/api/auth",
      cart     : "/api/cart",
      orders   : "/api/orders",
      promo    : "/api/promo",
      quiz     : "/api/quiz",
    },
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/products", productRoutes);
app.use("/api/auth",     authLimiter, authRoutes);
app.use("/api/cart",     cartRoutes);
app.use("/api/orders",   orderRoutes);
app.use("/api/promo",    promoRoutes);
app.use("/api/quiz",     quizRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✨ Perfume Zone Backend running on http://localhost:${PORT}`);
  console.log(`   Frontend origin: ${process.env.FRONTEND_ORIGIN || "http://localhost:5173"}`);
  console.log(`   Environment:     ${process.env.NODE_ENV || "development"}\n`);
});

