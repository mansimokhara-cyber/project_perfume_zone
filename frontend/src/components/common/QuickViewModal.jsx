import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export const QuickViewModal = ({ product, onClose, onNavigateToProduct }) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0].size : "50ml");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const currentPriceObj = product.sizes ? product.sizes.find(s => s.size === selectedSize) : null;
  const currentPrice = currentPriceObj ? currentPriceObj.price : product.price;

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    addToast(`Added ${quantity}x ${product.name} (${selectedSize}) to bag.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative z-10 bg-surface-container-lowest max-w-4xl w-full border border-outline-variant/30 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-surface/80 backdrop-blur-md p-2 text-primary hover:text-secondary transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Product Visual */}
        <div className="relative aspect-[4/5] md:aspect-auto bg-surface-container-low overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-primary text-on-primary font-label-caps text-[10px] px-2.5 py-1 tracking-widest uppercase">
                NEW RELEASE
              </span>
            )}
            <span className="bg-surface/90 backdrop-blur-md text-primary font-label-caps text-[10px] px-2.5 py-1 tracking-widest uppercase border border-outline-variant/30">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Details & Selection */}
        <div className="p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[80vh]">
          <div>
            <p className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-2">
              {product.subtitle}
            </p>
            <h2 className="font-headline-md text-3xl text-primary mb-2">{product.name}</h2>
            <p className="font-headline-md text-base text-primary/80 italic mb-4">"{product.tagline}"</p>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-secondary text-sm">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {i < Math.floor(product.rating) ? 'star' : i < product.rating ? 'star_half' : 'star_border'}
                  </span>
                ))}
              </div>
              <span className="text-xs font-body-md text-on-surface-variant">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Olfactory Notes Chips */}
            <div className="mb-6">
              <span className="font-label-caps text-[11px] text-primary block mb-2 uppercase tracking-wider">
                FRAGRANCE ACCORDS
              </span>
              <div className="flex flex-wrap gap-2">
                {product.chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border border-outline-variant/40 bg-surface-container-low font-label-caps text-[10px] text-primary tracking-widest"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <span className="font-label-caps text-[11px] text-primary block mb-2 uppercase tracking-wider">
                  BOTTLE FLACON SIZE
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s.size)}
                      className={`p-3 text-left border transition-all ${
                        selectedSize === s.size
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-outline-variant/50 hover:border-primary text-primary'
                      }`}
                    >
                      <span className="font-label-caps text-xs block font-bold">{s.size}</span>
                      <span className={`text-xs ${selectedSize === s.size ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                        ${s.price} USD
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-3 border border-outline-variant/50 px-4 py-3 w-full sm:w-auto justify-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="font-body-md text-sm font-semibold w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="w-full sm:flex-1 bg-secondary text-on-secondary py-3.5 font-button text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2"
            >
              <span>ADD TO BAG • ${currentPrice * quantity}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
