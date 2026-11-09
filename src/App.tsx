import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MealsHighlight } from './components/MealsHighlight';
import { MenuSection } from './components/MenuSection';
import { AboutAndFeatures } from './components/AboutAndFeatures';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { MenuImageLightbox } from './components/MenuImageLightbox';
import { OrderDrawer } from './components/OrderDrawer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { PdfDownloadModal } from './components/PdfDownloadModal';
import { CartItem, MenuItem, PriceOption } from './utils/orderCalculations';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('al_alamia_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('al_alamia_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const handleAddToCart = (item: MenuItem, option?: PriceOption, quantity: number = 1) => {
    setCart((prev) => {
      const optKey = option ? option.label : 'default';
      const cartItemId = `${item.id}-${optKey}`;
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          cartItemId,
          item,
          selectedOption: option,
          quantity,
        },
      ];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenLightbox = (imageUrl: string, title: string) => {
    setLightboxImage(imageUrl);
    setLightboxTitle(title);
  };

  const handleCloseLightbox = () => {
    setLightboxImage(null);
    setLightboxTitle(null);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#131722] text-gray-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onBrowseMenu={scrollToMenu}
          onOpenPdfModal={() => setIsPdfModalOpen(true)}
        />
        <MealsHighlight onAddToCart={(item) => handleAddToCart(item)} />
        <MenuSection
          onAddToCart={handleAddToCart}
          onOpenLightbox={handleOpenLightbox}
          onOpenPdfModal={() => setIsPdfModalOpen(true)}
        />
        <AboutAndFeatures />
        <LocationAndContact />
      </main>

      {/* Footer */}
      <Footer onOpenPdfModal={() => setIsPdfModalOpen(true)} />

      {/* Mobile Sticky Bar */}
      <StickyMobileBar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
      />

      {/* Cart Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Authentic Menu Lightbox Modal */}
      <MenuImageLightbox
        imageUrl={lightboxImage}
        title={lightboxTitle}
        onClose={handleCloseLightbox}
      />

      {/* PDF Menu Download Modal */}
      <PdfDownloadModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
}
