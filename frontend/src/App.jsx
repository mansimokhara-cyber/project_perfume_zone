import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { Header } from './components/common/Header.jsx';
import { Footer } from './components/common/Footer.jsx';
import { BottomNav } from './components/common/BottomNav.jsx';
import { CartDrawer } from './components/common/CartDrawer.jsx';
import { QuickViewModal } from './components/common/QuickViewModal.jsx';
import { ToastContainer } from './components/common/Toast.jsx';

import { HomePage } from './pages/HomePage.jsx';
import { CollectionsPage } from './pages/CollectionsPage.jsx';
import { ProductDetailPage } from './pages/ProductDetailPage.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { QuizPage } from './pages/QuizPage.jsx';

export const MainApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('velvet-amber-oudh');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProductId]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
  };

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col selection:bg-secondary/30 selection:text-primary">
      {/* Top Fixed App Bar */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Page Content */}
      <main className="flex-grow flex flex-col">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onQuickView={handleOpenQuickView}
          />
        )}

        {currentPage === 'collections' && (
          <CollectionsPage
            onSelectProduct={handleSelectProduct}
            onQuickView={handleOpenQuickView}
          />
        )}

        {currentPage === 'product' && (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={() => setCurrentPage('collections')}
            onSelectProduct={handleSelectProduct}
            onQuickView={handleOpenQuickView}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            onNavigateToHome={() => setCurrentPage('home')}
            onNavigateToCollections={() => setCurrentPage('collections')}
          />
        )}

        {currentPage === 'quiz' && (
          <QuizPage
            onSelectProduct={handleSelectProduct}
            onNavigateToCollections={() => setCurrentPage('collections')}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Floating Bottom Bar */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Sliding Luxury Cart Drawer */}
      <CartDrawer
        onNavigateToProduct={(p) => {
          handleSelectProduct(p);
        }}
        onNavigateToCheckout={() => {
          setCurrentPage('cart');
        }}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={handleCloseQuickView}
          onNavigateToProduct={(id) => {
            handleCloseQuickView();
            handleSelectProduct(id);
          }}
        />
      )}

      {/* Notifications Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </ToastProvider>
  );
}
