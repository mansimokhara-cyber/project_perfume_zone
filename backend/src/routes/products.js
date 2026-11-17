import { Router } from "express";
import { PRODUCTS, CATEGORIES } from "../data/products.js";

const router = Router();

// ─────────────────────────────────────────────────────────
// GET /api/products/featured
// Must be declared BEFORE /:id to avoid route conflict
// ─────────────────────────────────────────────────────────
router.get("/featured", (req, res) => {
  const featured = PRODUCTS.filter((p) => p.featured);
  res.json({ success: true, data: featured });
});

// ─────────────────────────────────────────────────────────
// GET /api/products
// Query params:
//   category  – e.g. FLORAL | WOODY | ORIENTAL | FRESH
//   sort      – featured | price-low | price-high | rating
//   search    – free-text (name, notes, description)
// ─────────────────────────────────────────────────────────
router.get("/", (req, res) => {
  const { category, sort, search } = req.query;

  let list = [...PRODUCTS];

  // Filter by category
  if (category && category !== "ALL") {
    const upper = category.toUpperCase();
    if (!CATEGORIES.includes(upper)) {
      return res
        .status(400)
        .json({ success: false, message: `Invalid category: ${category}` });
    }
    list = list.filter((p) => p.category === upper);
  }

  // Filter by search term
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.accentNotes.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sort === "price-low") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  }
  // default: original (featured) order

  res.json({
    success: true,
    total: list.length,
    categories: CATEGORIES,
    data: list,
  });
});

// ─────────────────────────────────────────────────────────
// GET /api/products/:id
// ─────────────────────────────────────────────────────────
router.get("/:id", (req, res) => {
  const product = PRODUCTS.find((p) => p.id === req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  // Also attach related products (same category, excluding self)
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  res.json({ success: true, data: product, related });
});

export default router;

