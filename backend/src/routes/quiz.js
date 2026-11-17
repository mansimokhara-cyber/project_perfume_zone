import { Router } from "express";
import { body, validationResult } from "express-validator";
import { PRODUCTS } from "../data/products.js";

const router = Router();

/**
 * Quiz answer shape:
 * {
 *   scent_family: "FLORAL" | "WOODY" | "FRESH" | "ORIENTAL"
 *   occasion: "high" | "medium" | "sensual" | "crisp"
 *   vibe: "luxury" | "mystic" | "modern" | "warm"
 * }
 */

// Scoring weights per quiz answer
const CATEGORY_MAP = {
  FLORAL: { FLORAL: 3, WOODY: 0, ORIENTAL: 1, FRESH: 1 },
  WOODY:  { FLORAL: 0, WOODY: 3, ORIENTAL: 1, FRESH: 0 },
  FRESH:  { FLORAL: 1, WOODY: 0, ORIENTAL: 0, FRESH: 3 },
  ORIENTAL: { FLORAL: 1, WOODY: 1, ORIENTAL: 3, FRESH: 0 },
};

const OCCASION_MAP = {
  high:    { chips: ["EXCLUSIVE", "OUD", "DARK", "SMOKY"] },
  medium:  { chips: ["SPICY", "FLORAL", "FRESH", "CITRUS"] },
  sensual: { chips: ["WARM", "VANILLA", "AMBER", "MUSK"] },
  crisp:   { chips: ["AQUATIC", "CITRUS", "GREEN"] },
};

const VIBE_MAP = {
  luxury: ["EXCLUSIVE", "BOUTIQUE"],
  mystic: ["DARK", "OUD", "SMOKY"],
  modern: ["FRESH", "AQUATIC", "CITRUS", "GREEN"],
  warm:   ["WARM", "VANILLA", "AMBER", "MUSK"],
};

// ─── POST /api/quiz/recommend ─────────────────────────────────────────────────
router.post(
  "/recommend",
  [
    body("scent_family")
      .isIn(["FLORAL", "WOODY", "FRESH", "ORIENTAL"])
      .withMessage("scent_family must be FLORAL, WOODY, FRESH, or ORIENTAL."),
    body("occasion")
      .isIn(["high", "medium", "sensual", "crisp"])
      .withMessage("occasion must be high, medium, sensual, or crisp."),
    body("vibe")
      .isIn(["luxury", "mystic", "modern", "warm"])
      .withMessage("vibe must be luxury, mystic, modern, or warm."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { scent_family, occasion, vibe } = req.body;

    // Score each product
    const categoryWeights = CATEGORY_MAP[scent_family] || {};
    const occasionChips   = OCCASION_MAP[occasion]?.chips || [];
    const vibeChips       = VIBE_MAP[vibe] || [];

    const scored = PRODUCTS.map((product) => {
      let score = 0;

      // Category match
      score += categoryWeights[product.category] || 0;

      // Occasion chip match
      const occasionMatch = product.chips.filter((c) => occasionChips.includes(c)).length;
      score += occasionMatch * 2;

      // Vibe chip match
      const vibeMatch = product.chips.filter((c) => vibeChips.includes(c)).length;
      score += vibeMatch * 2;

      // Bonus for high rating
      score += product.rating - 4; // adds 0–1 extra

      return { ...product, _score: score };
    });

    // Sort descending by score, take top 3
    scored.sort((a, b) => b._score - a._score);
    const recommendations = scored.slice(0, 3).map(({ _score, ...p }) => p);

    res.json({
      success: true,
      message: "Your bespoke olfactory matches are ready.",
      data: recommendations,
    });
  }
);

export default router;

