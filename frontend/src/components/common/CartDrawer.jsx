import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export const CartDrawer = ({ onNavigateToProduct, onNavigateToCheckout }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    rawSubtotal,
    discountAmount,
    subtotal,
    appliedPromo,
    applyPromo,
    removePromo,
    promoError,
    remainingForFreeShipping,
    freeShippingProgress
  } = useCart();

  const { addToast } = useToast();
  const [promoInput, setPromoInput] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const success = applyPromo(promoInput);
    if (success) {
      addToast(`Promo code "${promoInput.toUpperCase()}" applied!`, 'success');
      setPromoInput('');
    } else {
      addToast('Invalid promo code. Use LUXURY10 or GOLD20', 'error');
    }
  };

  const handleStartCheckout = () => {
    if (items.length === 0) {
      addToast('Your bag is currently empty.', 'error');
      return;
    }
    setCheckoutModalOpen(true);
    setOrderComplete(false);
  };

  const handleConfirmOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
      addToast('Order confirmed! A bespoke presentation box is being prepared.', 'success');
    }, 1200);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      {/* Cart Drawer Container */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-surface-container-lowest z-50 shadow-2xl flex flex-col border-l border-outline-variant/10 transform transition-transform duration-500 ease-out translate-x-0 animate-slide-left">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/10 bg-surface-bright">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">Your Scent Selection</h2>
            <p className="font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase">
              {items.length} {items.length === 1 ? 'Fragrance' : 'Fragrances'} Selected
            </p>
          </div>
          <button
            onClick={closeCart}
            className="text-on-surface-variant hover:text-primary transition-colors p-2"
            aria-label="Close cart"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Shipping Progress */}
        <div className="p-6 bg-surface-container-low border-b border-outline-variant/10">
          <p className="font-label-caps text-xs text-center mb-3 tracking-widest text-primary font-semibold">
            {remainingForFreeShipping > 0
              ? `$${remainingForFreeShipping} AWAY FROM FREE SHIPPING`
              : 'COMPLIMENTARY LUXURY SHIPPING UNLOCKED'}
          </p>
          <div className="w-full h-1.5 bg-surface-variant rounded-none overflow-hidden">
            <div
              className="h-full bg-secondary transition-all duration-700 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <span className="material-symbols-outlined text-5xl text-outline mb-4">shopping_bag</span>
              <p className="font-headline-md text-xl text-primary mb-2">Your Bag is Empty</p>
              <p className="font-body-md text-xs text-on-surface-variant max-w-xs mb-6">
                Explore our curated gallery of rare boutique fragrances and find your signature scent.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  if (onNavigateToProduct) onNavigateToProduct('collections');
                }}
                className="bg-primary text-on-primary px-8 py-3 font-button text-xs uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartItemId} className="flex gap-5 group border-b border-outline-variant/15 pb-6">
                <div className="w-20 h-28 flex-shrink-0 relative overflow-hidden bg-surface-container-low border border-outline-variant/20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-body-md text-sm font-semibold text-primary">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-on-surface-variant hover:text-error transition-colors p-0.5"
                        title="Remove item"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                    <p className="font-body-md text-xs text-on-surface-variant mt-0.5">{item.subtitle}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 border border-outline-variant/40 px-2.5 py-1 bg-surface-container-lowest">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <span className="material-symbols-outlined text-xs">remove</span>
                      </button>
                      <span className="font-body-md text-xs font-semibold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        aria-label="Increase quantity"
                      >
                        <span className="material-symbols-outlined text-xs">add</span>
                      </button>
                    </div>

                    <p className="font-headline-md text-base text-primary font-medium">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary / Promo / Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-surface-container-high border-t border-outline-variant/20 space-y-5">
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-surface-container-lowest border border-secondary/40 p-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">verified</span>
                    <span className="font-label-caps text-xs text-primary font-bold">{appliedPromo} APPLIED</span>
                    <span className="text-xs text-secondary font-medium">(-${discountAmount})</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-xs font-label-caps text-on-surface-variant hover:text-error"
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="relative flex items-center">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="PROMO CODE (e.g. LUXURY10)"
                    className="w-full bg-transparent border-0 border-b border-outline-variant/60 px-0 py-2 font-body-md text-xs text-primary focus:ring-0 focus:border-secondary transition-colors uppercase placeholder:text-on-surface-variant/60"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-2 font-label-caps text-xs text-primary hover:text-secondary font-bold tracking-widest transition-colors"
                  >
                    APPLY
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-error mt-1">{promoError}</p>}
            </div>

            {/* Subtotal Calculation */}
            <div className="space-y-2 pt-2 border-t border-outline-variant/10">
              {appliedPromo && (
                <div className="flex justify-between items-center text-xs font-body-md text-on-surface-variant">
                  <span>Regular Subtotal</span>
                  <span>${rawSubtotal}</span>
                </div>
              )}
              {appliedPromo && (
                <div className="flex justify-between items-center text-xs font-body-md text-secondary">
                  <span>VIP Atelier Discount</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between items-end">
                <span className="font-body-md text-xs text-on-surface-variant uppercase tracking-widest">
                  Estimated Total
                </span>
                <span className="font-headline-md text-2xl text-primary font-bold leading-none">
                  ${subtotal}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleStartCheckout}
              className="w-full bg-secondary text-on-secondary font-button text-xs uppercase tracking-widest py-4 hover:bg-primary hover:text-on-primary transition-colors duration-300 rounded-none shadow-md"
            >
              Secure Checkout
            </button>
            <p className="text-center font-label-caps text-[10px] text-on-surface-variant/70 tracking-widest uppercase">
              Taxes and complimentary shipping calculated at checkout.
            </p>
          </div>
        )}
      </div>

      {/* Checkout Simulation Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-fade-in">
          <div className="bg-surface-container-lowest max-w-lg w-full p-8 border border-secondary/30 shadow-2xl relative">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {!orderComplete ? (
              <div>
                <span className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-2 block">
                  ATELIER BOUTIQUE CHECKOUT
                </span>
                <h3 className="font-headline-md text-2xl text-primary mb-4">Confirm Luxury Dispatch</h3>

                <div className="bg-surface-container-low p-4 mb-6 space-y-2 text-xs font-body-md border border-outline-variant/20">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Items ({items.reduce((s, i) => s + i.quantity, 0)}):</span>
                    <span className="font-semibold text-primary">${rawSubtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-secondary">
                      <span>VIP Privilege Discount:</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">White Glove Courier:</span>
                    <span className="text-secondary font-medium">COMPLIMENTARY</span>
                  </div>
                  <div className="border-t border-outline-variant/20 pt-2 flex justify-between text-sm font-bold text-primary">
                    <span>Total Due:</span>
                    <span>${subtotal}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="font-label-caps text-[11px] text-on-surface-variant block mb-1">
                      DELIVERY ADDRESS
                    </label>
                    <input
                      type="text"
                      defaultValue="742 Evergreen Terrace, Suite 10, New York, NY 10021"
                      className="w-full bg-surface-container-low border border-outline-variant/40 p-2.5 text-xs font-body-md focus:border-secondary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-[11px] text-on-surface-variant block mb-1">
                      PAYMENT METHOD
                    </label>
                    <div className="border border-outline-variant/40 p-2.5 flex items-center justify-between text-xs bg-surface-container-low">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">credit_card</span>
                        <span>•••• •••• •••• 4242 (Obsidian Private Reserve)</span>
                      </div>
                      <span className="font-label-caps text-[10px] text-secondary">READY</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  disabled={isCheckingOut}
                  className="w-full bg-primary text-on-primary py-4 font-button text-xs uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-colors duration-300 disabled:opacity-50"
                >
                  {isCheckingOut ? 'Securing Transaction...' : `Place Order • $${subtotal}`}
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <span className="material-symbols-outlined text-6xl text-secondary mb-4">verified</span>
                <h3 className="font-headline-md text-3xl text-primary mb-2">Order Confirmed</h3>
                <p className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-4">
                  ORDER #PZ-{Math.floor(100000 + Math.random() * 900000)}
                </p>
                <p className="font-body-md text-sm text-on-surface-variant max-w-sm mx-auto mb-8 leading-relaxed">
                  Your bespoke presentation box is being hand-finished by our master perfumers in Paris. Tracking details have been dispatched to your email.
                </p>
                <button
                  onClick={() => {
                    setCheckoutModalOpen(false);
                    closeCart();
                  }}
                  className="bg-primary text-on-primary px-8 py-3.5 font-button text-xs uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-colors"
                >
                  Return to Boutique
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
