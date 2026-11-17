# PERFUME ZONE — Luxury Fragrance Experience (React Frontend)

An editorial, haute parfumerie e-commerce web application converted from Google Stitch design specifications adhering to the **Obsidian & Gold Editorial** design system.

---

## 🏛️ Design System Highlights

- **Aesthetic**: Quiet Luxury & Modern Minimalism meets Glassmorphism.
- **Palette**: Deep Obsidian Black (`#000000` / `#050505`), Warm Champagne Gold (`#D4AF37` / `#735c00`), Muted Cream Surfaces (`#FCF9F8` / `#F6F3F2`).
- **Typography**: `Playfair Display` (Serif editorial headlines) and `Montserrat` (clean sans-serif with tracking).
- **Shapes**: Sharp 0px architectural geometry reinforcing boutique prestige.
- **Frosted Glass**: 20px blur with gold & cream borders.

---

## 📁 Project & Component Directory Structure

```
frontend/
├── index.html                   # Entry point with Tailwind CSS, Google Fonts, and React mounting
├── package.json                 # Modular dependencies (React 18, Vite, Tailwind CSS)
├── README.md                    # Documentation
└── src/
    ├── index.css                # Obsidian & Gold luxury CSS variables, animations, glassmorphism
    ├── main.jsx                 # Application bootstrapping
    ├── App.jsx                  # Root Layout, Routing State, Global Drawers & Providers
    ├── context/
    │   ├── CartContext.jsx      # Global Cart state (items, subtotal, VIP promos, free shipping meter)
    │   └── ToastContext.jsx     # Champagne gold notifications
    ├── data/
    │   └── products.js          # Fragrance catalog with Olfactory Pyramids, flacon sizes & Stitch assets
    ├── components/
    │   ├── common/
    │   │   ├── Header.jsx       # Frosted glass top app bar with live bag badge & slide menu
    │   │   ├── Footer.jsx       # 3-column editorial footer with newsletter & boutique dispatches
    │   │   ├── BottomNav.jsx    # Mobile floating navigation bar
    │   │   ├── CartDrawer.jsx   # Sliding luxury cart drawer with live subtotal & shipping meter
    │   │   ├── QuickViewModal.jsx # Fragrance detail quick view modal with flacon selector
    │   │   └── Toast.jsx        # Gold-accented toast notifications
    │   └── home/
    │       ├── HeroSection.jsx  # Velvet Amber & Oudh spotlight with frosted glass card
    │       ├── ScentQuiz.jsx    # Interactive 3-step Scent Quiz with personalized recommendations
    │       └── FeaturedGrid.jsx # Staggered 2-column editorial grid (Santal Noir & Rose Enigma)
    └── pages/
        ├── HomePage.jsx         # Home page (converted from perfume_zone_home)
        ├── CollectionsPage.jsx  # The Collection (converted from collections_perfume_zone)
        ├── ProductDetailPage.jsx# Product Detail & Olfactory Pyramid (converted from perfume_zone_e_commerce_flow)
        └── CartPage.jsx         # Dedicated Cart & Order Checkout (converted from your_cart_perfume_zone)
```

---

## ⚡ Features

1. **Interactive Scent Quiz**: 3-step questionnaire (Family -> Occasion -> Aura) yielding tailored fragrance matches with instant Quick Add.
2. **Filterable Collections**: Filter by Floral, Woody, Oriental, Fresh with live sorting by Price and Rating.
3. **Olfactory Pyramid**: Detailed breakdown of Top, Heart, and Base notes with sillage & longevity guidance.
4. **Interactive Sliding Cart**: Real-time quantity adjustments, free shipping progress bar ($200 goal), and promo codes (`LUXURY10`, `GOLD20`).
5. **Simulated Secure Checkout**: Complete purchase workflow with order summary and instant confirmation.
6. **Mobile Optimized**: Responsive floating frosted glass bottom bar with touch navigation.

---

## 🚀 Running the Application

### Direct Browser Preview:
Open `frontend/index.html` directly in any web browser.

### Via Vite / Node.js (when Node is installed):
```bash
npm install
npm run dev
```
