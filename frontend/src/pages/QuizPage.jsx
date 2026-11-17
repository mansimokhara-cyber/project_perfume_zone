import React from 'react';
import { ScentQuiz } from '../components/home/ScentQuiz.jsx';

export const QuizPage = ({ onSelectProduct, onNavigateToCollections }) => {
  return (
    <div className="flex-grow pt-24 pb-20">
      <div className="container mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop mb-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-2">
            PRIVATE CONSULTATION
          </p>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-4">
            Bespoke Scent Finder
          </h1>
          <p className="font-body-lg text-sm text-on-surface-variant leading-relaxed">
            Answer three sensory questions to unlock your bespoke olfactory match crafted by our Parisian master perfumers.
          </p>
        </div>
      </div>

      <ScentQuiz onSelectProduct={onSelectProduct} />
    </div>
  );
};
