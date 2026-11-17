import { Router } from "express";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { carts, orders } from "../data/store.js";
import { PROMO_CODES, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "../data/products.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

// ─── Helper ───────────────────────────────────────────────────────────────────
const computeTotals = (items, promoCode) => {
  const rawSubtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const promo = promoCode ? PROMO_CODES[promoCode.trim().toUpperCase()] : null;
  const discountPercent = promo ? promo.discount : 0;
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const subtotal = rawSubtotal - discountAmount;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  return { rawSubtotal, discountPercent, discountAmount, subtotal, shipping, total };
};

// ─── POST /api/orders  (checkout) ────────────────────────────────────────────
router.post(
  "/",
  [
    body("shippingAddress").notEmpty().withMessage("Shipping address is required."),
    body("promoCode").optional().isString(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const userId = req.user.id;
    const items = carts.get(userId) || [];

    if (items.length === 0) {
      return res.status(400).json({ success: false, message: "Your cart is empty." });
    }

    const { shippingAddress, promoCode } = req.body;
    const totals = computeTotals(items, promoCode);

    const orderId = `PZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const order = {
      orderId,
      userId,
      items: [...items],
      shippingAddress,
      promoCode: promoCode ? promoCode.toUpperCase() : null,
      ...totals,
      status: "confirmed",
      placedAt: new Date().toISOString(),
      estimatedDelivery: "2-3 business days",
    };

    orders.set(orderId, order);

    // Clear cart after successful order
    carts.set(userId, []);

    res.status(201).json({
      success: true,
      message: "Order placed successfully! Your bespoke presentation box is being prepared.",
      data: order,
    });
  }
);

// ─── GET /api/orders  (order history) ────────────────────────────────────────
router.get("/", (req, res) => {
  const userId = req.user.id;
  const userOrders = [...orders.values()]
    .filter((o) => o.userId === userId)
    .sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));

  res.json({ success: true, total: userOrders.length, data: userOrders });
});

// ─── GET /api/orders/:orderId ─────────────────────────────────────────────────
router.get("/:orderId", (req, res) => {
  const order = orders.get(req.params.orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found." });
  }
  if (order.userId !== req.user.id) {
    return res.status(403).json({ success: false, message: "Access denied." });
  }
  res.json({ success: true, data: order });
});

export default router;

