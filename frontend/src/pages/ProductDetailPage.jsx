import React, { useState } from 'react';
import { PRODUCTS } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const ProductDetailPage = ({ productId, onBack, onSelectProduct, onQuickView }) => {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0].size : "50ml");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('notes');

  const { addToCart } = useCart();
  const { addToast } = useToast();

  const selectedSizeObj = product.sizes ? product.sizes.find(s => s.size === selectedSize) : null;
  const currentPrice = selectedSizeObj ? selectedSizeObj.price : product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    addToast(`Added ${quantity}x ${product.name} (${selectedSize}) to bag.`, 'success');
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 2);

  return (
    <div className="flex-grow pt-24 pb-20 container mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
      {/* Breadcrumb & Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="font-label-caps text-xs text-on-surface-variant hover:text-primary flex items-center gap-2 uppercase tracking-widest transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Collection</span>
        </button>

        <span className="font-label-caps text-xs text-secondary tracking-widest uppercase">
          HAUTE PARFUMERIE • LIMITED RELEASE
        </span>
      </div>

      {/* Main Product Layout (2-Column Editorial) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
        {/* Left Column: Fragrance Flacon Image Presentation */}
        <div className="lg:col-span-6">
          <div className="sticky top-28 bg-surface-container-low border border-outline-variant/20 overflow-hidden relative group">
            <div className="aspect-[3/4] w-full relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500"></div>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-primary text-on-primary font-label-caps text-[10px] px-3 py-1 tracking-widest uppercase shadow-md">
                    NEW ARRIVAL
                  </span>
                )}
                <span className="bg-surface/90 backdrop-blur-md text-primary font-label-caps text-[10px] px-3 py-1 tracking-widest uppercase border border-outline-variant/30 shadow-md">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Olfactory Profile & Purchasing */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          <div className="border-b border-outline-variant/20 pb-6 mb-6">
            <p className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-2">
              {product.subtitle}
            </p>
            <h1 className="font-display-lg-mobile md:font-headline-lg text-primary mb-2">
              {product.name}
            </h1>
            <p className="font-headline-md text-lg text-primary/80 italic mb-4">
              "{product.tagline}"
            </p>

            {/* Ratings & Price */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
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

              <span className="font-headline-md text-3xl text-primary font-bold">
                ${currentPrice} <span className="text-xs font-normal text-on-surface-variant">USD</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="font-body-lg text-base text-on-surface-variant mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Flacon Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider">
                SELECT FLACON VOLUME
              </span>
              <span className="font-label-caps text-[11px] text-secondary tracking-wider">
                COMPLIMENTARY TRAVEL ATOMIZER
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`p-4 text-left border transition-all cursor-pointer ${
                    selectedSize === s.size
                      ? 'border-primary bg-primary text-on-primary shadow-md'
                      : 'border-outline-variant/50 hover:border-primary text-primary bg-surface-container-lowest'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline-md text-base font-bold">{s.size}</span>
                    <span className={`text-xs font-label-caps ${selectedSize === s.size ? 'text-secondary-fixed' : 'text-secondary'}`}>
                      ${s.price}
                    </span>
                  </div>
                  <span className={`text-[11px] font-body-md block ${selectedSize === s.size ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>
                    {s.size === '50ml' ? 'Boutique Flacon' : 'Grand Reserve Flacon'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Bag */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {/* Quantity */}
            <div className="flex items-center justify-between border border-outline-variant/60 px-4 py-3 sm:w-36 bg-surface-container-lowest">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-on-surface-variant hover:text-primary p-1"
                aria-label="Decrease quantity"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="font-body-md text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-on-surface-variant hover:text-primary p-1"
                aria-label="Increase quantity"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-secondary text-on-secondary py-4 px-8 font-button text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors duration-300 shadow-md flex items-center justify-center gap-3 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              <span>ADD TO BAG • ${currentPrice * quantity}</span>
            </button>
          </div>

          {/* Luxury Services Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-surface-container-low border border-outline-variant/20 mb-8 text-xs font-body-md text-on-surface-variant">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-xl">local_shipping</span>
              <span>Free Luxury Shipping over $200</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-xl">science</span>
              <span>2 Samples Included with Order</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-xl">redeem</span>
              <span>Signature Gift Box Packaging</span>
            </div>
          </div>

          {/* Olfactory Note Pyramid & Details Tabs */}
          <div className="border-t border-outline-variant/20 pt-6">
            <div className="flex gap-8 border-b border-outline-variant/20 pb-3 mb-6">
              <button
                onClick={() => setActiveTab('notes')}
                className={`font-label-caps text-xs uppercase tracking-widest transition-colors ${
                  activeTab === 'notes' ? 'text-secondary font-bold border-b-2 border-secondary pb-3 -mb-3.5' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Olfactory Pyramid
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`font-label-caps text-xs uppercase tracking-widest transition-colors ${
                  activeTab === 'details' ? 'text-secondary font-bold border-b-2 border-secondary pb-3 -mb-3.5' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Craftsmanship
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`font-label-caps text-xs uppercase tracking-widest transition-colors ${
                  activeTab === 'usage' ? 'text-secondary font-bold border-b-2 border-secondary pb-3 -mb-3.5' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Ritual &amp; Sillage
              </button>
            </div>

            {activeTab === 'notes' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-surface-container-lowest p-4 border border-outline-variant/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-xs text-secondary">flare</span>
                    <span className="font-label-caps text-xs text-primary font-bold uppercase">TOP NOTES (Initial 15 Mins)</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant pl-5">
                    {product.notes.top.join(' • ')}
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-4 border border-outline-variant/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-xs text-secondary">favorite</span>
                    <span className="font-label-caps text-xs text-primary font-bold uppercase">HEART NOTES (The Core Aura)</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant pl-5">
                    {product.notes.heart.join(' • ')}
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-4 border border-outline-variant/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-xs text-secondary">landscape</span>
                    <span className="font-label-caps text-xs text-primary font-bold uppercase">BASE NOTES (Lingering Soul - 8+ Hours)</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant pl-5">
                    {product.notes.base.join(' • ')}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="p-4 bg-surface-container-lowest border border-outline-variant/20 space-y-3 text-xs font-body-md text-on-surface-variant animate-fade-in">
                <p>
                  <strong>Formulation:</strong> 32% pure perfume concentration (Extrait de Parfum).
                </p>
                <p>
                  <strong>Maceration:</strong> Aged in French oak glass carboys for 6 months prior to hand-pouring.
                </p>
                <p>
                  <strong>Glass Bottle:</strong> Custom faceted heavy crystal flacon made by European artisans.
                </p>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="p-4 bg-surface-container-lowest border border-outline-variant/20 space-y-3 text-xs font-body-md text-on-surface-variant animate-fade-in">
                <p>
                  Spray lightly onto pulse points: the nape of the neck, collarbone, and inner wrists. Allow to settle naturally on the skin without rubbing to preserve the delicate top note molecular structure.
                </p>
                <p className="text-secondary font-medium">
                  Projection: Moderate-Strong | Sillage: 12+ Hours
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Complementary Fragrances Section */}
      <div className="border-t border-outline-variant/20 pt-16">
        <div className="text-center mb-12">
          <p className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-1">
            CURATED HARMONIES
          </p>
          <h2 className="font-headline-lg text-2xl md:text-3xl text-primary">
            You May Also Admire
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectProduct(rel.id)}
              className="bg-surface-container-low p-6 border border-outline-variant/20 flex gap-6 items-center cursor-pointer group hover:border-primary transition-colors"
            >
              <div className="w-24 h-32 flex-shrink-0 overflow-hidden bg-surface-container-lowest">
                <img
                  src={rel.image}
                  alt={rel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="font-label-caps text-[9px] text-secondary tracking-widest uppercase">
                  {rel.category}
                </span>
                <h3 className="font-headline-md text-lg text-primary group-hover:text-secondary transition-colors">
                  {rel.name}
                </h3>
                <p className="font-body-md text-xs text-on-surface-variant mb-2">
                  {rel.accentNotes}
                </p>
                <span className="font-body-md text-sm font-semibold text-primary">
                  ${rel.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
