import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';

export const Header = ({ currentPage, onNavigate }) => {
  const { totalItemsCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'The Collection' },
    { id: 'quiz', label: 'Scent Finder' },
    { id: 'cart', label: 'Cart' }
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 transition-all duration-300 ease-in-out">
        {/* Left: Mobile Menu Toggle & Desktop Nav */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-primary hover:text-secondary transition-colors p-1"
            aria-label="Open navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-label-caps text-xs tracking-widest uppercase transition-colors relative py-1 ${
                  currentPage === link.id
                    ? 'text-secondary font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-secondary'
                    : 'text-on-surface hover:text-secondary'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: Brand Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="font-headline-md text-headline-md tracking-tighter text-primary text-center hover:opacity-80 transition-opacity"
        >
          PERFUME ZONE
        </button>

        {/* Right: Actions (Shopping bag & Quick Quiz) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick('quiz')}
            className="hidden sm:flex items-center gap-1 text-xs font-label-caps tracking-widest text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/40 px-3 py-1.5"
          >
            <span className="material-symbols-outlined text-sm text-secondary">auto_awesome</span>
            <span>QUIZ</span>
          </button>

          <button
            onClick={openCart}
            className="text-primary hover:text-secondary transition-colors relative p-1 flex items-center justify-center"
            aria-label="Open cart drawer"
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={totalItemsCount > 0 ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              shopping_bag
            </span>
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-surface">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-surface-container-lowest h-full shadow-2xl z-10 flex flex-col justify-between p-8 border-r border-outline-variant/20">
            <div>
              <div className="flex justify-between items-center mb-12 border-b border-outline-variant/20 pb-4">
                <span className="font-headline-md text-lg tracking-tighter text-primary">PERFUME ZONE</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-on-surface-variant hover:text-primary p-1"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left font-display-lg-mobile text-2xl transition-colors ${
                      currentPage === link.id ? 'text-secondary font-bold' : 'text-primary hover:text-secondary'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-outline-variant/20 pt-6">
              <p className="font-label-caps text-xs text-on-surface-variant mb-2">BOUTIQUE &amp; ATELIER</p>
              <p className="font-body-md text-xs text-on-surface-variant/80">Quiet Luxury Haute Parfumerie</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
