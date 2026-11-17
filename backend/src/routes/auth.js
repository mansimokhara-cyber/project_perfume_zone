import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { body, validationResult } from "express-validator";
import { users } from "../data/store.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// ─── Helpers ────────────────────────────────────────────────────────────────
const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const safeUser = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  createdAt: u.createdAt,
});

// ─── POST /api/auth/register ─────────────────────────────────────────────────
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(422)
          .json({ success: false, errors: errors.array() });
      }

      const { name, email, password } = req.body;

      // Check duplicate email
      const existing = [...users.values()].find((u) => u.email === email);
      if (existing) {
        return res
          .status(409)
          .json({ success: false, message: "Email already registered." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const id = uuidv4();
      const user = { id, name, email, password: hashedPassword, createdAt: new Date().toISOString() };
      users.set(id, user);

      const token = signToken({ id, email, name });

      res.status(201).json({
        success: true,
        message: "Account created successfully.",
        token,
        user: safeUser(user),
      });
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
router.post(
  "/login",
  [
    body("email").trim().isEmail().normalizeEmail().withMessage("Valid email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = [...users.values()].find((u) => u.email === email);
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
      }

      const token = signToken({ id: user.id, email: user.email, name: user.name });

      res.json({
        success: true,
        message: "Login successful.",
        token,
        user: safeUser(user),
      });
    } catch (err) {
      next(err);
    }
  }
);

// ─── GET /api/auth/me  (protected) ───────────────────────────────────────────
router.get("/me", authenticate, (req, res) => {
  const user = users.get(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }
  res.json({ success: true, user: safeUser(user) });
});

export default router;

