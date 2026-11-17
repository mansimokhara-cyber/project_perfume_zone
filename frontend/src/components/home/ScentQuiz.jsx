import React, { useState } from 'react';
import { QUIZ_QUESTIONS, PRODUCTS } from '../../data/products.js';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export const ScentQuiz = ({ onSelectProduct }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const activeQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (option) => {
    const updatedAnswers = { ...answers, [activeQuestion.id]: option };
    setAnswers(updatedAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate best recommendation
      calculateRecommendation(updatedAnswers);
    }
  };

  const calculateRecommendation = (finalAnswers) => {
    const chosenCategory = finalAnswers.scent_family?.category || 'ORIENTAL';
    // Find matching category product
    const match = PRODUCTS.find(p => p.category === chosenCategory) || PRODUCTS[0];
    setRecommendedProduct(match);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendedProduct(null);
  };

  const handleQuickAdd = () => {
    if (recommendedProduct) {
      addToCart(recommendedProduct, "50ml", 1);
      addToast(`Added recommended fragrance ${recommendedProduct.name} to bag!`, 'success');
    }
  };

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-bright">
      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-2">
            BESPOKE ALCHEMY
          </p>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
            Find Your Signature Scent
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
            Discover the perfect fragrance tailored to your unique aura and preferences.
          </p>
        </div>

        {/* Quiz Body */}
        <div className="max-w-3xl mx-auto bg-surface-container-lowest border border-outline-variant/20 p-8 md:p-12 shadow-sm transition-all duration-300">
          {!recommendedProduct ? (
            <>
              {/* Step indicator */}
              <div className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-4">
                <span className="font-label-caps text-label-caps text-primary uppercase font-bold">
                  Step {activeQuestion.step} of {activeQuestion.totalSteps}
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  {activeQuestion.stepTitle}
                </span>
              </div>

              {/* Step Title */}
              <h3 className="font-headline-md text-headline-md text-primary mb-8 text-center">
                {activeQuestion.question}
              </h3>

              {/* Option Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activeQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="border border-outline-variant/30 p-6 flex flex-col items-center justify-center hover:border-primary hover:bg-surface-container-low transition-all duration-300 group text-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-4xl mb-4 text-on-surface-variant group-hover:text-secondary transition-colors">
                      {opt.icon}
                    </span>
                    <span className="font-label-caps text-label-caps text-primary block mb-1">
                      {opt.label}
                    </span>
                    {opt.desc && (
                      <span className="font-body-md text-[11px] text-on-surface-variant/80 hidden sm:block">
                        {opt.desc}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Back button if step > 0 */}
              {currentStep > 0 && (
                <div className="mt-8 flex justify-start">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="font-label-caps text-xs text-on-surface-variant hover:text-primary flex items-center gap-1 uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Previous Question</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Result recommendation card */
            <div className="text-center animate-fade-in">
              <span className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-2 block font-semibold">
                YOUR BESPOKE MATCH FOUND
              </span>
              <h3 className="font-headline-md text-3xl text-primary mb-2">
                {recommendedProduct.name}
              </h3>
              <p className="font-headline-md text-base text-primary/80 italic mb-6">
                "{recommendedProduct.tagline}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center text-left my-8 bg-surface-container-low p-6 border border-outline-variant/20">
                <div className="aspect-[4/5] bg-surface-container-lowest overflow-hidden">
                  <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <span className="font-label-caps text-[10px] text-secondary tracking-widest uppercase block mb-1">
                      {recommendedProduct.subtitle}
                    </span>
                    <p className="font-body-md text-sm text-on-surface-variant mb-4 leading-relaxed">
                      {recommendedProduct.description}
                    </p>
                    <div className="mb-4">
                      <span className="font-label-caps text-[11px] text-primary block mb-1">KEY NOTES</span>
                      <p className="font-body-md text-xs text-primary font-medium">
                        {recommendedProduct.accentNotes}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                    <span className="font-headline-md text-2xl text-primary font-bold">
                      ${recommendedProduct.price}
                    </span>
                    <span className="font-label-caps text-xs text-secondary uppercase tracking-widest">
                      {recommendedProduct.category} FAMILY
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={handleQuickAdd}
                  className="bg-secondary text-on-secondary px-8 py-4 font-button text-xs uppercase tracking-widest hover:bg-primary transition-colors"
                >
                  Quick Add to Bag • ${recommendedProduct.price}
                </button>
                <button
                  onClick={() => onSelectProduct && onSelectProduct(recommendedProduct.id)}
                  className="border border-primary px-8 py-4 font-button text-xs uppercase tracking-widest text-primary hover:bg-surface-container-high transition-colors"
                >
                  Explore Details
                </button>
                <button
                  onClick={handleReset}
                  className="font-label-caps text-xs text-on-surface-variant hover:text-primary py-4 uppercase tracking-widest"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
