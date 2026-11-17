import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products.js';

const CartContext = createContext(null);

const INITIAL_CART = [
  {
    cartItemId: "velvet-amber-oudh-50ml",
    id: "velvet-amber-oudh",
    name: "Velvet Amber & Oudh",
    subtitle: "50ml Extrait de Parfum",
    size: "50ml",
    price: 185,
    quantity: 1,
    image: PRODUCTS[0].image
  },
  {
    cartItemId: "midnight-fig-vetiver-100ml",
    id: "midnight-fig-vetiver",
    name: "Midnight Fig & Vetiver",
    subtitle: "100ml Eau de Parfum",
    size: "100ml",
    price: 140,
    quantity: 1,
    image: PRODUCTS[7].image
  }
];

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('perfume_zone_cart');
      return saved ? JSON.parse(saved) : INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  const FREE_SHIPPING_THRESHOLD = 200;

  useEffect(() => {
    try {
      localStorage.setItem('perfume_zone_cart', JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  const addToCart = (product, size = "50ml", quantity = 1) => {
    const selectedSizeObj = product.sizes ? product.sizes.find(s => s.size === size) : null;
    const price = selectedSizeObj ? selectedSizeObj.price : product.price;
    const cartItemId = `${product.id}-${size}`;

    setItems(prevItems => {
      const existing = prevItems.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prevItems.map(i =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [
        ...prevItems,
        {
          cartItemId,
          id: product.id,
          name: product.name,
          subtitle: `${size} ${product.subtitle || 'Eau de Parfum'}`,
          size,
          price,
          quantity,
          image: product.image
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromo = (code) => {
    const trimmed = (code || '').trim().toUpperCase();
    if (!trimmed) {
      setPromoError('Please enter a promo code.');
      return false;
    }
    if (trimmed === 'LUXURY10' || trimmed === 'WELCOME10') {
      setDiscountPercent(10);
      setAppliedPromo(trimmed);
      setPromoError('');
      return true;
    } else if (trimmed === 'GOLD20' || trimmed === 'VIP20') {
      setDiscountPercent(20);
      setAppliedPromo(trimmed);
      setPromoError('');
      return true;
    } else {
      setPromoError('Invalid promo code. Try "LUXURY10"');
      return false;
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setDiscountPercent(0);
    setPromoCode('');
    setPromoError('');
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(prev => !prev),
        totalItemsCount,
        rawSubtotal,
        discountAmount,
        subtotal,
        promoCode,
        setPromoCode,
        appliedPromo,
        applyPromo,
        removePromo,
        promoError,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        remainingForFreeShipping,
        freeShippingProgress
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
