import React from 'react';

export const HeroSection = ({ onExplore, onSelectProduct }) => {
  return (
    <section className="relative h-[707px] md:h-screen w-full flex items-center justify-center bg-surface-container-highest px-margin-mobile md:px-margin-desktop overflow-hidden">
      {/* Background Hero Image from Google Stitch */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-85 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
          alt="Luxury perfume bottle on reflective obsidian surface"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEHhUjVKZryH428kWV4Qkv5_riO_95H4zywAdRgC3oyj0QkL1lNMGjXIejVMPcwNd3G7uNXTJmDaQKSslAV8AUyLY38rieeaaB2XwfP9YFsTgZxB07CO5NzG3IbG9b2-XMydJO6eC8WkG-OaSZsa1V7mGWTlNgo417ZAAo1t2ufIu2ph4Uuvt14Sf6QylRZ2CFTXOoB_v5nm2zTH3w0ZpkrZqC4omb3ionFkKRYBmctP7XZ7p6RwAlPw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/20"></div>
      </div>

      {/* Frosted Glass Overlay Card */}
      <div className="relative z-10 text-center glass-panel p-8 md:p-12 max-w-2xl mx-auto flex flex-col items-center shadow-2xl border border-outline-variant/30">
        <p className="font-label-caps text-xs md:text-sm mb-4 tracking-[0.25em] text-on-surface-variant uppercase font-semibold">
          NEW ARRIVAL
        </p>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2 leading-tight">
          Velvet Amber &amp; Oudh
        </h1>
        <p className="font-headline-md text-headline-md text-primary mb-8 italic opacity-90 font-normal">
          The Essence of Midnight
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onExplore}
            className="bg-secondary text-on-secondary px-8 py-4 font-button text-button hover:bg-tertiary hover:text-on-tertiary transition-colors duration-300 uppercase tracking-widest shadow-md"
          >
            Explore the Collection
          </button>
          <button
            onClick={() => onSelectProduct && onSelectProduct('velvet-amber-oudh')}
            className="border border-primary bg-surface/40 backdrop-blur-md text-primary px-8 py-4 font-button text-button hover:bg-primary hover:text-on-primary transition-colors duration-300 uppercase tracking-widest"
          >
            View Fragrance
          </button>
        </div>
      </div>
    </section>
  );
};
