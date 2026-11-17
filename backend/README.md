# Perfume Zone – Backend

Node.js / Express REST API that powers the Perfume Zone luxury e-commerce frontend.

## Stack
- **Runtime**: Node.js v18+
- **Framework**: Express 4
- **Auth**: JWT (jsonwebtoken) + bcryptjs for password hashing
- **Storage**: In-memory (ready to swap for a real DB)

## Quick Start

```bash
cd backend
npm install
npm run dev        # development (auto-restart on file change)
# or
npm start          # production
```

The server starts on **http://localhost:5000** by default (configure via `.env`).

## API Endpoints

### Products
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List all products (supports `?category=&sort=&search=`) |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/featured` | Get featured products |

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/me` | Get current user (🔒 requires Bearer token) |

### Cart
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/cart` | Get user's cart (🔒) |
| POST | `/api/cart/add` | Add item to cart (🔒) |
| PUT | `/api/cart/item/:cartItemId` | Update item quantity (🔒) |
| DELETE | `/api/cart/item/:cartItemId` | Remove item (🔒) |
| DELETE | `/api/cart` | Clear cart (🔒) |

### Orders
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/orders` | Place order / checkout (🔒) |
| GET | `/api/orders` | Get user's order history (🔒) |
| GET | `/api/orders/:orderId` | Get single order (🔒) |

### Promo Codes
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/promo/validate` | Validate a promo code |

### Scent Quiz
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/quiz/recommend` | Get product recommendations based on quiz answers |

## Environment Variables (`.env`)
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port |
| `JWT_SECRET` | *(set me!)* | Secret for signing JWTs |
| `JWT_EXPIRES_IN` | `7d` | JWT expiry |
| `FRONTEND_ORIGIN` | `http://localhost:5173` | CORS allowed origin |

