import { Router } from "express";
import { body, validationResult } from "express-validator";
import { PROMO_CODES } from "../data/products.js";

const router = Router();

// ─── POST /api/promo/validate ─────────────────────────────────────────────────
router.post(
  "/validate",
  [body("code").trim().notEmpty().withMessage("Promo code is required.")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const code = req.body.code.trim().toUpperCase();
    const promo = PROMO_CODES[code];

    if (!promo) {
      return res.status(400).json({
        success: false,
        message: `Invalid promo code. Try "LUXURY10" or "GOLD20".`,
      });
    }

    res.json({
      success: true,
      message: `Promo code "${code}" applied — ${promo.discount}% off!`,
      data: { code, discount: promo.discount, label: promo.label },
    });
  }
);

export default router;

