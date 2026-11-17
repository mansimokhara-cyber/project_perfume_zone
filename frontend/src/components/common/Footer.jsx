import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext.jsx';

export const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    addToast('Welcome to the Perfume Zone Atelier Privé.', 'success');
    setEmail('');
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20 pt-16 pb-24 md:pb-16 px-margin-mobile md:px-margin-desktop transition-opacity mt-auto">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand & Statement */}
          <div className="md:col-span-4 flex flex-col items-start">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="font-headline-md text-2xl tracking-tighter text-primary mb-4 text-left"
            >
              PERFUME ZONE
            </button>
            <p className="font-body-md text-sm text-on-surface-variant max-w-sm mb-6 leading-relaxed">
              Crafted in limited small batches using rare botanical absolutes, precious woods, and golden resins. An expression of quiet luxury.
            </p>
            <span className="font-label-caps text-[11px] text-secondary tracking-widest uppercase">
              PARIS • NEW YORK • MILAN
            </span>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-label-caps text-xs text-primary mb-4 tracking-widest uppercase">EXPLORE</h4>
              <ul className="space-y-3 font-body-md text-sm text-on-surface-variant">
                <li>
                  <button onClick={() => onNavigate && onNavigate('collections')} className="hover:text-secondary transition-colors">
                    The Collection
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate && onNavigate('quiz')} className="hover:text-secondary transition-colors">
                    Scent Quiz
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate && onNavigate('cart')} className="hover:text-secondary transition-colors">
                    Your Scent Selection
                  </button>
                </li>
                <li>
                  <a href="#new-arrivals" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }} className="hover:text-secondary transition-colors">
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-label-caps text-xs text-primary mb-4 tracking-widest uppercase">CLIENT CARE</h4>
              <ul className="space-y-3 font-body-md text-sm text-on-surface-variant">
                <li><a href="#shipping" onClick={(e) => { e.preventDefault(); addToast('Complimentary shipping on orders over $200.'); }} className="hover:text-secondary transition-colors">Shipping &amp; Returns</a></li>
                <li><a href="#samples" onClick={(e) => { e.preventDefault(); addToast('Two complimentary luxury samples included with every full bottle.'); }} className="hover:text-secondary transition-colors">Complimentary Samples</a></li>
                <li><a href="#care" onClick={(e) => { e.preventDefault(); addToast('Store fragrances away from direct sunlight at steady temperature.'); }} className="hover:text-secondary transition-colors">Fragrance Care</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); addToast('Concierge available 24/7 at concierge@perfumezone.com'); }} className="hover:text-secondary transition-colors">Private Concierge</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 flex flex-col justify-start">
            <h4 className="font-label-caps text-xs text-primary mb-2 tracking-widest uppercase">ATELIER DISPATCHES</h4>
            <p className="font-body-md text-xs text-on-surface-variant mb-4">
              Receive private invitations to private batch releases and bespoke olfactory tastings.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/40 px-4 py-3 text-xs font-body-md text-primary focus:outline-none focus:border-secondary transition-colors placeholder:text-on-surface-variant/60"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary px-6 py-3 font-label-caps text-xs hover:bg-secondary hover:text-on-secondary transition-colors uppercase tracking-widest flex-shrink-0"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body-md text-on-surface-variant">
          <p>© {new Date().getFullYear()} PERFUME ZONE. THE ART OF FRAGRANCE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-secondary transition-colors">Terms of Service</a>
            <a href="#accessibility" onClick={(e) => e.preventDefault()} className="hover:text-secondary transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
