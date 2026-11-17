// In-memory store – replace with a real database (MongoDB, PostgreSQL, etc.)
// for production use.

// users  Map<userId, userObject>
export const users = new Map();

// carts  Map<userId, cartItem[]>
export const carts = new Map();

// orders Map<orderId, orderObject>
export const orders = new Map();

