import React from 'react';
import { useCart } from '../../context/CartContext.jsx';

export const BottomNav = ({ currentPage, onNavigate }) => {
  const { totalItemsCount, openCart } = useCart();

  const navItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'collections', icon: 'search', label: 'Search' },
    { id: 'quiz', icon: 'auto_awesome', label: 'Quiz' },
    { id: 'cart', icon: 'shopping_bag', label: 'Cart', badge: totalItemsCount, isCartTrigger: true }
  ];

  return (
    <nav className="bg-surface/90 backdrop-blur-xl border-t border-outline-variant/30 fixed bottom-0 w-full z-40 flex justify-around items-center h-16 px-4 md:hidden shadow-lg">
      {navItems.map(item => {
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.isCartTrigger) {
                openCart();
              } else {
                onNavigate(item.id);
              }
            }}
            className={`flex flex-col items-center justify-center p-2 relative transition-all duration-200 active:scale-90 ${
              isActive
                ? 'text-primary scale-110 font-bold'
                : 'text-on-surface-variant/70 hover:text-primary'
            }`}
            aria-label={item.label}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            {item.badge > 0 && (
              <span className="absolute top-1 right-2 bg-secondary text-on-secondary text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-surface">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
