import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CombosSection } from './components/CombosSection';
import { PromotionsSection } from './components/PromotionsSection';
import { MonteSeuAcaiSection } from './components/MonteSeuAcaiSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { AcaiCustomizerModal } from './components/AcaiCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CartItem, ProductItem } from './types';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('acaiteria_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('acaiteria_cart', JSON.stringify(cart));
    } catch {
      // ignore storage quota issues
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddProductToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          type: 'product',
          title: product.name,
          details: product.ingredients || [product.description],
          unitPrice: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });

    showToast(`"${product.name}" adicionado à sacola!`);
  };

  const handleAddCustomToCart = (customItem: CartItem) => {
    setCart((prev) => [...prev, customItem]);
    showToast(`Açaí personalizado adicionado à sacola!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#faf5f8] text-[#2d001a] font-['Poppins',sans-serif] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#38011e] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#910f54] flex items-center gap-3 animate-bounce-slight">
          <CheckCircle2 className="w-5 h-5 text-[#fbbf24] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs font-black uppercase text-[#fbbf24] hover:underline cursor-pointer"
          >
            Ver Sacola
          </button>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section matching reference */}
        <HeroSection onOpenCustomizer={() => setIsCustomizerOpen(true)} />

        {/* 2. Combos Section matching reference */}
        <CombosSection
          onAddToCart={handleAddProductToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 3. Promotions Section matching reference */}
        <PromotionsSection
          onAddToCart={handleAddProductToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 4. Monte seu Açaí Section matching reference */}
        <MonteSeuAcaiSection onOpenCustomizer={() => setIsCustomizerOpen(true)} />

        {/* 5. Quality, Origin & About */}
        <AboutSection />

        {/* 6. Customer Testimonials */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Modals & Drawers */}
      <AcaiCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddToCart={handleAddCustomToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
