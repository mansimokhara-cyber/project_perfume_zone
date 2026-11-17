import React from 'react';
import { PRODUCTS } from '../../data/products.js';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export const FeaturedGrid = ({ onNavigateToCollections, onSelectProduct, onQuickView }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const santalNoir = PRODUCTS.find(p => p.id === 'santal-noir') || PRODUCTS[1];
  const roseEnigma = PRODUCTS.find(p => p.id === 'rose-enigma') || PRODUCTS[2];

  const handleQuickAdd = (product) => {
    addToCart(product, "50ml", 1);
    addToast(`Added ${product.name} (50ml) to bag!`, 'success');
  };

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-16 border-b border-outline-variant/10 pb-4">
          <div>
            <p className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-1">
              CURATED ESSENCES
            </p>
            <h2 className="font-headline-lg text-headline-lg text-primary">Featured Collection</h2>
          </div>
          <button
            onClick={onNavigateToCollections}
            className="font-button text-button text-primary hover:text-secondary transition-colors underline underline-offset-4 uppercase tracking-widest"
          >
            View All
          </button>
        </div>

        {/* 2-Column Staggered Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter md:gap-x-12 lg:gap-x-24">
          {/* Product Card 1: Santal Noir */}
          <div className="group flex flex-col items-center">
            <div
              onClick={() => onSelectProduct && onSelectProduct(santalNoir.id)}
              className="w-full aspect-[3/4] bg-surface-container-low mb-6 relative overflow-hidden cursor-pointer border border-outline-variant/10"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={santalNoir.name}
                src={santalNoir.image}
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500"></div>
              
              {/* Quick View Floating Pill */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(santalNoir);
                }}
                className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 font-label-caps text-[10px] text-primary hover:bg-primary hover:text-on-primary transition-colors tracking-widest uppercase opacity-0 group-hover:opacity-100 shadow-md"
              >
                QUICK VIEW
              </button>
            </div>

            <h3
              onClick={() => onSelectProduct && onSelectProduct(santalNoir.id)}
              className="font-headline-md text-headline-md text-primary mb-2 text-center cursor-pointer hover:text-secondary transition-colors"
            >
              {santalNoir.name}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 text-center">
              {santalNoir.accentNotes}
            </p>

            <div className="flex gap-2 mb-6">
              {santalNoir.chips.map((chip, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 border border-outline-variant/30 bg-surface-container-lowest font-label-caps text-label-caps text-[10px] uppercase"
                >
                  {chip}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleQuickAdd(santalNoir)}
              className="w-full md:w-auto border border-primary px-8 py-3 font-button text-button text-primary hover:bg-primary hover:text-on-primary transition-colors duration-300 uppercase tracking-widest cursor-pointer"
            >
              Quick Add - ${santalNoir.price}
            </button>
          </div>

          {/* Product Card 2: Rose Enigma */}
          <div className="group flex flex-col items-center mt-12 md:mt-24">
            <div
              onClick={() => onSelectProduct && onSelectProduct(roseEnigma.id)}
              className="w-full aspect-[3/4] bg-surface-container-low mb-6 relative overflow-hidden cursor-pointer border border-outline-variant/10"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={roseEnigma.name}
                src={roseEnigma.image}
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500"></div>

              {/* Quick View Floating Pill */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(roseEnigma);
                }}
                className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 font-label-caps text-[10px] text-primary hover:bg-primary hover:text-on-primary transition-colors tracking-widest uppercase opacity-0 group-hover:opacity-100 shadow-md"
              >
                QUICK VIEW
              </button>
            </div>

            <h3
              onClick={() => onSelectProduct && onSelectProduct(roseEnigma.id)}
              className="font-headline-md text-headline-md text-primary mb-2 text-center cursor-pointer hover:text-secondary transition-colors"
            >
              {roseEnigma.name}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 text-center">
              {roseEnigma.accentNotes}
            </p>

            <div className="flex gap-2 mb-6">
              {roseEnigma.chips.map((chip, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 border border-outline-variant/30 bg-surface-container-lowest font-label-caps text-label-caps text-[10px] uppercase"
                >
                  {chip}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleQuickAdd(roseEnigma)}
              className="w-full md:w-auto border border-primary px-8 py-3 font-button text-button text-primary hover:bg-primary hover:text-on-primary transition-colors duration-300 uppercase tracking-widest cursor-pointer"
            >
              Quick Add - ${roseEnigma.price}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
