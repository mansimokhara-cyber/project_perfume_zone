import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const CartPage = ({ onNavigateToHome, onNavigateToCollections }) => {
  const {
    items,
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
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      addToast('Order confirmed! A bespoke presentation box is being prepared.', 'success');
    }, 1200);
  };

  return (
    <div className="flex-grow pt-28 pb-24 container mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
      {/* Title */}
      <div className="text-center mb-12">
        <p className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-2">
          CLIENT ATELIER
        </p>
        <h1 className="font-display-lg-mobile md:font-display-lg text-primary">
          Your Scent Selection
        </h1>
        <p className="font-body-lg text-sm text-on-surface-variant mt-2">
          Review your chosen artisanal fragrances before white-glove packaging.
        </p>
      </div>

      {orderComplete ? (
        <div className="max-w-2xl mx-auto bg-surface-container-lowest border border-secondary/30 p-12 text-center shadow-xl animate-fade-in">
          <span className="material-symbols-outlined text-6xl text-secondary mb-4">verified</span>
          <h2 className="font-headline-md text-3xl text-primary mb-2">Thank You for Your Order</h2>
          <p className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-4">
            ORDER #PZ-{Math.floor(100000 + Math.random() * 900000)}
          </p>
          <p className="font-body-md text-sm text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
            Your artisanal fragrances will be hand-inspected and sealed with bespoke wax insignia. Expected delivery is within 2-3 business days.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onNavigateToCollections}
              className="bg-primary text-on-primary px-8 py-3.5 font-button text-xs uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="max-w-xl mx-auto bg-surface-container-lowest border border-outline-variant/20 p-12 text-center shadow-sm">
          <span className="material-symbols-outlined text-6xl text-outline mb-4">shopping_bag</span>
          <h2 className="font-headline-md text-2xl text-primary mb-2">Your Bag is Empty</h2>
          <p className="font-body-md text-sm text-on-surface-variant mb-8">
            You have not selected any fragrances yet.
          </p>
          <button
            onClick={onNavigateToCollections}
            className="bg-secondary text-on-secondary px-8 py-4 font-button text-xs uppercase tracking-widest hover:bg-primary transition-colors"
          >
            Explore the Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-6">
            {/* Free shipping banner */}
            <div className="p-6 bg-surface-container-low border border-outline-variant/20">
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-caps text-xs text-primary font-semibold tracking-wider uppercase">
                  {remainingForFreeShipping > 0
                    ? `$${remainingForFreeShipping} away from complimentary shipping`
                    : 'You have qualified for complimentary luxury courier!'}
                </span>
                <span className="font-label-caps text-[10px] text-secondary">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface-variant overflow-hidden">
                <div
                  className="h-full bg-secondary transition-all duration-700"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="bg-surface-container-lowest border border-outline-variant/20 divide-y divide-outline-variant/15">
              {items.map((item) => (
                <div key={item.cartItemId} className="p-6 flex flex-col sm:flex-row gap-6 items-start group">
                  <div className="w-24 h-32 flex-shrink-0 bg-surface-container-low border border-outline-variant/20 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-32 w-full">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-headline-md text-lg text-primary">{item.name}</h3>
                        <span className="font-headline-md text-lg text-primary font-bold">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                      <p className="font-body-md text-xs text-on-surface-variant">{item.subtitle}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 border border-outline-variant/40 px-3 py-1 bg-surface-container-lowest">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="text-on-surface-variant hover:text-primary"
                        >
                          <span className="material-symbols-outlined text-xs">remove</span>
                        </button>
                        <span className="font-body-md text-xs font-semibold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="text-on-surface-variant hover:text-primary"
                        >
                          <span className="material-symbols-outlined text-xs">add</span>
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="font-label-caps text-xs text-on-surface-variant hover:text-error transition-colors uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-surface-container-lowest border border-outline-variant/20 p-8 shadow-sm space-y-6 sticky top-28">
              <h2 className="font-headline-md text-xl text-primary border-b border-outline-variant/20 pb-4">
                Summary of Order
              </h2>

              {/* Promo code field */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-surface-container-low border border-secondary/40 p-3">
                    <span className="font-label-caps text-xs text-primary font-bold">
                      {appliedPromo} (-${discountAmount})
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-xs font-label-caps text-on-surface-variant hover:text-error"
                    >
                      REMOVE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE (LUXURY10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-surface-container-low border border-outline-variant/40 px-3 py-2 text-xs font-body-md text-primary focus:outline-none focus:border-secondary uppercase"
                    />
                    <button
                      type="submit"
                      className="bg-primary text-on-primary px-4 py-2 font-label-caps text-xs uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[11px] text-error mt-1">{promoError}</p>}
              </div>

              {/* Line items */}
              <div className="space-y-3 text-xs font-body-md text-on-surface-variant pt-2 border-t border-outline-variant/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-primary">${rawSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>VIP Privilege Savings</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span className="text-secondary font-medium">
                    {subtotal >= 200 ? 'FREE' : '$15'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Presentation Packaging</span>
                  <span className="text-secondary font-medium">COMPLIMENTARY</span>
                </div>
                <div className="border-t border-outline-variant/20 pt-4 flex justify-between items-end">
                  <span className="font-headline-md text-base text-primary uppercase">Estimated Total</span>
                  <span className="font-headline-md text-2xl text-primary font-bold">
                    ${subtotal >= 200 ? subtotal : subtotal + 15}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-secondary text-on-secondary py-4 font-button text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors duration-300 shadow-md disabled:opacity-50"
              >
                {isProcessing ? 'Securing Transaction...' : 'Proceed to Checkout'}
              </button>

              <p className="text-center font-label-caps text-[10px] text-on-surface-variant/70 tracking-widest uppercase">
                Encrypted with 256-bit bank-grade SSL security.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
