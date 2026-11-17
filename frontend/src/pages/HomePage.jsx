import React from 'react';
import { HeroSection } from '../components/home/HeroSection.jsx';
import { ScentQuiz } from '../components/home/ScentQuiz.jsx';
import { FeaturedGrid } from '../components/home/FeaturedGrid.jsx';

export const HomePage = ({ onNavigate, onSelectProduct, onQuickView }) => {
  return (
    <div className="flex-grow">
      {/* Hero Spotlight Section */}
      <HeroSection
        onExplore={() => onNavigate('collections')}
        onSelectProduct={onSelectProduct}
      />

      {/* Scent Quiz Interactive Widget */}
      <ScentQuiz onSelectProduct={onSelectProduct} />

      {/* Featured Collection Editorial Grid */}
      <FeaturedGrid
        onNavigateToCollections={() => onNavigate('collections')}
        onSelectProduct={onSelectProduct}
        onQuickView={onQuickView}
      />

      {/* Brand Philosophy Editorial Banner */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container-high border-y border-outline-variant/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-4 font-semibold">
            THE PHILOSOPHY OF QUIET LUXURY
          </p>
          <h2 className="font-display-lg-mobile md:font-headline-lg text-primary mb-6 leading-relaxed">
            "A fragrance does not shout. It commands attention through sublime subtlety and sensory refinement."
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
            Every flacon is precision-crafted with crystal glass, sharp architectural silhouettes, and filled with cold-aged botanical elixirs.
          </p>
          <div className="flex justify-center gap-12 text-center">
            <div>
              <span className="font-headline-md text-2xl text-primary font-bold block">100%</span>
              <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase">Rare Botanical Extracts</span>
            </div>
            <div className="h-10 w-[1px] bg-outline-variant/40 self-center"></div>
            <div>
              <span className="font-headline-md text-2xl text-primary font-bold block">180</span>
              <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase">Days Cold Maceration</span>
            </div>
            <div className="h-10 w-[1px] bg-outline-variant/40 self-center"></div>
            <div>
              <span className="font-headline-md text-2xl text-primary font-bold block">0%</span>
              <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase">Synthetic Fixatives</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
