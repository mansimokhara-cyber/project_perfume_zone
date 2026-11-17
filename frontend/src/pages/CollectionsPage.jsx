import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const CollectionsPage = ({ onSelectProduct, onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.accentNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, sortBy, searchQuery]);

  const handleQuickAdd = (product) => {
    addToCart(product, "50ml", 1);
    addToast(`Added ${product.name} (50ml) to your bag!`, 'success');
  };

  return (
    <div className="flex-grow container mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop py-12 pt-28">
      {/* Page Title & Editorial Header */}
      <div className="text-center mb-12">
        <p className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-2">
          HAUTE PARFUMERIE
        </p>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
          The Collection
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl mx-auto leading-relaxed">
          Discover our meticulously curated selection of artisanal fragrances, designed for the modern connoisseur.
        </p>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search input */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search by note or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/40 pl-10 pr-4 py-2 text-xs font-body-md text-primary focus:outline-none focus:border-secondary transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-on-surface-variant hover:text-primary text-xs"
            >
              clear
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">
            SORT BY:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/40 px-3 py-2 text-xs font-body-md text-primary focus:outline-none focus:border-secondary transition-colors"
          >
            <option value="featured">Atelier Curated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="mb-14 overflow-x-auto no-scrollbar pb-2">
        <div className="flex space-x-3 md:justify-center min-w-max px-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 font-label-caps text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary border border-primary shadow-sm font-bold'
                  : 'bg-surface-container-low border border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <span className="material-symbols-outlined text-4xl text-outline mb-2">filter_alt_off</span>
          <p className="font-headline-md text-xl text-primary mb-2">No fragrances matched your criteria</p>
          <p className="font-body-md text-xs text-on-surface-variant mb-6">
            Try resetting your filters or search keywords.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
            className="bg-primary text-on-primary px-6 py-2.5 font-label-caps text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-section-gap">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* Image Container with Hover Zoom */}
              <div
                onClick={() => onSelectProduct && onSelectProduct(product.id)}
                className="relative w-full aspect-[4/5] bg-surface-container-low mb-6 overflow-hidden border border-outline-variant/10 cursor-pointer"
              >
                <img
                  alt={product.name}
                  src={product.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.isNew && (
                    <span className="bg-primary text-on-primary font-label-caps text-[9px] px-2.5 py-1 tracking-widest uppercase shadow-sm">
                      NEW
                    </span>
                  )}
                  <span className="bg-surface/90 backdrop-blur-md text-primary font-label-caps text-[9px] px-2.5 py-1 tracking-widest uppercase border border-outline-variant/30 shadow-sm">
                    {product.category}
                  </span>
                </div>

                {/* Quick View Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(product);
                  }}
                  className="absolute bottom-4 right-4 bg-surface/95 backdrop-blur-md px-3.5 py-2 font-label-caps text-[10px] text-primary hover:bg-primary hover:text-on-primary transition-colors tracking-widest uppercase opacity-0 group-hover:opacity-100 shadow-md"
                >
                  QUICK VIEW
                </button>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h2
                  onClick={() => onSelectProduct && onSelectProduct(product.id)}
                  className="font-headline-md text-headline-md text-primary mb-2 cursor-pointer hover:text-secondary transition-colors"
                >
                  {product.name}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                  {product.accentNotes}
                </p>

                {/* Star Rating */}
                <div className="flex justify-center items-center space-x-1 mb-4 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {i < Math.floor(product.rating)
                        ? 'star'
                        : i < product.rating
                        ? 'star_half'
                        : 'star_border'}
                    </span>
                  ))}
                  <span className="text-[11px] font-body-md text-on-surface-variant ml-1">
                    ({product.reviewsCount})
                  </span>
                </div>

                {/* Pricing and Action */}
                <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
                  <span className="font-body-lg text-body-lg font-medium text-primary">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="bg-secondary text-on-secondary px-8 py-3 font-button text-button hover:bg-primary transition-colors w-full sm:w-auto uppercase tracking-widest cursor-pointer shadow-sm"
                  >
                    QUICK ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
