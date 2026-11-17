import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { PRODUCTS } from "../data/products.js";
import { carts } from "../data/store.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// All cart routes require authentication
router.use(authenticate);

// ─── Helper: get or init a user's cart ───────────────────────────────────────
const getCart = (userId) => carts.get(userId) || [];
const saveCart = (userId, items) => carts.set(userId, items);

// ─── GET /api/cart ────────────────────────────────────────────────────────────
router.get("/", (req, res) => {
  const items = getCart(req.user.id);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  res.json({ success: true, data: { items, subtotal } });
});

// ─── POST /api/cart/add ───────────────────────────────────────────────────────
router.post(
  "/add",
  [
    body("productId").trim().notEmpty().withMessage("productId is required."),
    body("size").trim().notEmpty().withMessage("size is required (e.g. 50ml)."),
    body("quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("quantity must be a positive integer."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { productId, size, quantity = 1 } = req.body;

    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    const sizeObj = product.sizes.find((s) => s.size === size);
    if (!sizeObj) {
      return res.status(400).json({
        success: false,
        message: `Size "${size}" not available for this product.`,
      });
    }

    const cartItemId = `${productId}-${size}`;
    const items = getCart(req.user.id);
    const existing = items.find((i) => i.cartItemId === cartItemId);

    let updatedItems;
    if (existing) {
      updatedItems = items.map((i) =>
        i.cartItemId === cartItemId
          ? { ...i, quantity: i.quantity + Number(quantity) }
          : i
      );
    } else {
      updatedItems = [
        ...items,
        {
          cartItemId,
          id: product.id,
          name: product.name,
          subtitle: `${size} ${product.subtitle || "Eau de Parfum"}`,
          size,
          price: sizeObj.price,
          quantity: Number(quantity),
          image: product.image,
        },
      ];
    }

    saveCart(req.user.id, updatedItems);
    const subtotal = updatedItems.reduce((s, i) => s + i.price * i.quantity, 0);

    res.json({
      success: true,
      message: `${product.name} (${size}) added to cart.`,
      data: { items: updatedItems, subtotal },
    });
  }
);

// ─── PUT /api/cart/item/:cartItemId ──────────────────────────────────────────
router.put(
  "/item/:cartItemId",
  [
    param("cartItemId").trim().notEmpty(),
    body("quantity").isInt({ min: 0 }).withMessage("quantity must be >= 0."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { cartItemId } = req.params;
    const { quantity } = req.body;
    let items = getCart(req.user.id);

    if (!items.find((i) => i.cartItemId === cartItemId)) {
      return res.status(404).json({ success: false, message: "Cart item not found." });
    }

    if (quantity === 0) {
      items = items.filter((i) => i.cartItemId !== cartItemId);
    } else {
      items = items.map((i) =>
        i.cartItemId === cartItemId ? { ...i, quantity: Number(quantity) } : i
      );
    }

    saveCart(req.user.id, items);
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

    res.json({ success: true, data: { items, subtotal } });
  }
);

// ─── DELETE /api/cart/item/:cartItemId ────────────────────────────────────────
router.delete("/item/:cartItemId", (req, res) => {
  const { cartItemId } = req.params;
  let items = getCart(req.user.id);

  if (!items.find((i) => i.cartItemId === cartItemId)) {
    return res.status(404).json({ success: false, message: "Cart item not found." });
  }

  items = items.filter((i) => i.cartItemId !== cartItemId);
  saveCart(req.user.id, items);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  res.json({ success: true, message: "Item removed.", data: { items, subtotal } });
});

// ─── DELETE /api/cart ─────────────────────────────────────────────────────────
router.delete("/", (req, res) => {
  saveCart(req.user.id, []);
  res.json({ success: true, message: "Cart cleared.", data: { items: [], subtotal: 0 } });
});

export default router;

