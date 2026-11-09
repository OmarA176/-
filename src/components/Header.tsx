import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, ShoppingBag, Menu, X, MapPin, FileDown } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPdfModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenPdfModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#131722]/95 backdrop-blur-md border-b border-amber-500/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Brand Zone */}
        <a href="#hero" className="flex items-center gap-3 group shrink-0">
          <motion.img
            whileHover={{ rotate: 10, scale: 1.08 }}
            src={RESTAURANT_INFO.logo}
            alt={RESTAURANT_INFO.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/50 shadow-md shadow-amber-500/20"
          />
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-gold-gradient whitespace-nowrap">
              {RESTAURANT_INFO.name}
            </span>
            <span className="text-xs text-amber-300/80 font-semibold whitespace-nowrap">
              {RESTAURANT_INFO.nameEn}
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-gray-200">
          <a
            href="#hero"
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            الرئيسية
          </a>
          <a
            href="#menu"
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            قائمة المأكولات
          </a>
          <a
            href="#meals-highlight"
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            الوجبات والمشويات
          </a>
          <a
            href="#about"
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            عن العالمية
          </a>
          <a
            href="#location"
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            الموقع والتواصل
          </a>
          <button
            onClick={onOpenPdfModal}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>تحميل المنيو PDF</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Call to Order button (Brightened warm orange) */}
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 px-4 py-2.5 rounded-xl text-sm font-black shadow-md shadow-orange-500/25 transition-all whitespace-nowrap cursor-pointer"
            aria-label="اتصل للطلب"
          >
            <Phone className="w-4 h-4 text-slate-950 fill-current animate-pulse" />
            <span>اتصل للطلب: {RESTAURANT_INFO.displayPhone}</span>
          </motion.a>

          {/* Quick Cart button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 rounded-xl bg-[#1e2330] hover:bg-[#272e3f] border border-gray-700 text-amber-300 transition-colors cursor-pointer"
            aria-label="عرض سلة الطلبات"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 focus:outline-none"
            aria-label="فتح القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#161a25] border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-bold text-gray-200 hover:text-amber-300 hover:bg-gray-800/60"
          >
            الرئيسية
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-bold text-gray-200 hover:text-amber-300 hover:bg-gray-800/60"
          >
            قائمة المأكولات والأسعار
          </a>
          <a
            href="#meals-highlight"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-bold text-gray-200 hover:text-amber-300 hover:bg-gray-800/60"
          >
            الوجبات والمشويات
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-bold text-gray-200 hover:text-amber-300 hover:bg-gray-800/60"
          >
            عن العالمية
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-bold text-gray-200 hover:text-amber-300 hover:bg-gray-800/60"
          >
            موقعنا في السويس
          </a>
          <div className="pt-2 border-t border-gray-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPdfModal();
              }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black py-2.5 rounded-lg text-sm"
            >
              <FileDown className="w-4 h-4" />
              <span>تحميل المنيو الكامل PDF</span>
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 py-2.5 rounded-lg text-sm font-black"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>اتصل للطلب: {RESTAURANT_INFO.displayPhone}</span>
            </a>
            <a
              href={RESTAURANT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#222736] hover:bg-[#2b3144] text-gray-200 py-2.5 rounded-lg text-sm font-medium"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>عرض الموقع على Google Maps</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
