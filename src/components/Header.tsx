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
  const [activeNav, setActiveNav] = useState('home');

  return (
    <header className="sticky top-0 z-40 bg-[#090b10]/25 backdrop-blur-md border-b border-white/10 shadow-sm transition-colors">
      {/* Top Announcement & Quick Contact Bar (Translucent glassmorphic) */}
      <div className="bg-black/15 border-b border-white/5 text-[10px] sm:text-xs text-gray-300 py-1.5 px-3 sm:px-8 font-medium backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Right: Working Hours with status indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-300 truncate">
            <span className="font-semibold text-gray-200 truncate">
              مفتوح 24 ساعة يوميًا <span className="hidden sm:inline text-gray-400 font-normal">(السبت: 9 صباحًا - 5 مساءً)</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-gray-300 inline-block shadow-sm shrink-0" />
          </div>

          {/* Center: Address */}
          <div className="hidden md:flex items-center gap-1.5 text-gray-300 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#caa85d]" />
            <span>شارع عثمان بن عفان، فيصل، السويس</span>
          </div>

          {/* Left: Direct Phone */}
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="flex items-center gap-1 text-[#caa85d] hover:text-[#ddc686] font-bold font-mono transition-colors shrink-0"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            <span dir="ltr">0110 176 0700</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">
        {/* Brand Zone (Right side in RTL) */}
        <a href="#hero" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="flex flex-col text-right">
            <span className="text-xl sm:text-3xl font-black text-[#dfc57d] tracking-wide font-['Tajawal',sans-serif] leading-tight">
              العالمية
            </span>
            <span className="text-[10px] sm:text-xs text-[#caa85d]/85 font-bold tracking-wider">
              كافيه & ريستورانت
            </span>
          </div>

          {/* Ornate Gold Circular Badge */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full p-[1.5px] bg-gradient-to-tr from-[#9a7a35] via-[#dfc57d] to-[#caa85d] shadow-md shadow-black/40 shrink-0">
            <div className="w-full h-full rounded-full bg-[#121620] flex items-center justify-center overflow-hidden border border-[#caa85d]/40">
              <img
                src={RESTAURANT_INFO.logo}
                alt="Al Alamia Emblem"
                className="w-full h-full object-cover rounded-full filter contrast-125 brightness-95"
              />
            </div>
          </div>
        </a>

        {/* Center Navigation Links (Matching Screenshot Nav Items) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-200">
          <a
            href="#hero"
            onClick={() => setActiveNav('home')}
            className={`relative py-1 transition-colors ${
              activeNav === 'home'
                ? 'text-[#dfc57d] after:content-[""] after:absolute after:bottom-0 after:right-0 after:left-0 after:h-[2px] after:bg-[#caa85d]'
                : 'hover:text-[#dfc57d]'
            }`}
          >
            الرئيسية
          </a>

          <a
            href="#meals-highlight"
            onClick={() => setActiveNav('meals')}
            className={`relative py-1 transition-colors ${
              activeNav === 'meals'
                ? 'text-[#dfc57d] after:content-[""] after:absolute after:bottom-0 after:right-0 after:left-0 after:h-[2px] after:bg-[#caa85d]'
                : 'hover:text-[#dfc57d]'
            }`}
          >
            الأكثر طلباً
          </a>

          <a
            href="#menu"
            onClick={() => setActiveNav('menu')}
            className={`relative py-1 transition-colors ${
              activeNav === 'menu'
                ? 'text-[#dfc57d] after:content-[""] after:absolute after:bottom-0 after:right-0 after:left-0 after:h-[2px] after:bg-[#caa85d]'
                : 'hover:text-[#dfc57d]'
            }`}
          >
            القائمة
          </a>

          <a
            href="#about"
            onClick={() => setActiveNav('about')}
            className={`relative py-1 transition-colors ${
              activeNav === 'about'
                ? 'text-[#dfc57d] after:content-[""] after:absolute after:bottom-0 after:right-0 after:left-0 after:h-[2px] after:bg-[#caa85d]'
                : 'hover:text-[#dfc57d]'
            }`}
          >
            عن المطعم
          </a>

          <a
            href="#location"
            onClick={() => setActiveNav('location')}
            className={`relative py-1 transition-colors ${
              activeNav === 'location'
                ? 'text-[#dfc57d] after:content-[""] after:absolute after:bottom-0 after:right-0 after:left-0 after:h-[2px] after:bg-[#caa85d]'
                : 'hover:text-[#dfc57d]'
            }`}
          >
            الموقع
          </a>

          <a
            href="#reviews"
            onClick={() => setActiveNav('reviews')}
            className={`relative py-1 transition-colors ${
              activeNav === 'reviews'
                ? 'text-[#dfc57d] after:content-[""] after:absolute after:bottom-0 after:right-0 after:left-0 after:h-[2px] after:bg-[#caa85d]'
                : 'hover:text-[#dfc57d]'
            }`}
          >
            تقييمات العملاء
          </a>

          <a
            href="#location"
            onClick={() => setActiveNav('contact')}
            className={`relative py-1 transition-colors ${
              activeNav === 'contact'
                ? 'text-[#dfc57d] after:content-[""] after:absolute after:bottom-0 after:right-0 after:left-0 after:h-[2px] after:bg-[#caa85d]'
                : 'hover:text-[#dfc57d]'
            }`}
          >
            تواصل معنا
          </a>
        </nav>

        {/* Action Controls (Left side in RTL) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Download PDF Menu Pill */}
          <button
            onClick={onOpenPdfModal}
            className="hidden xl:flex items-center gap-1.5 text-xs text-[#dfc57d] hover:text-white bg-[#caa85d]/10 hover:bg-[#caa85d]/20 border border-[#caa85d]/30 px-3.5 py-2 rounded-full transition-colors cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>منيو PDF</span>
          </button>

          {/* Red Phone Call Pill Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#be3426] hover:bg-[#a92c20] text-white font-black px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-base shadow-lg shadow-red-950/40 transition-all font-mono"
            aria-label="اتصل للطلب"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current animate-pulse" />
            <span dir="ltr" className="hidden sm:inline">01101760700</span>
            <span className="sm:hidden font-sans whitespace-nowrap">اطلب</span>
          </motion.a>

          {/* Quick Cart button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-[#1c2230]/80 hover:bg-[#252d40] border border-[#caa85d]/25 text-[#dfc57d] transition-colors cursor-pointer backdrop-blur-sm"
            aria-label="عرض سلة الطلبات"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#bfa054] text-slate-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Animated 3-Bar Hamburger Toggle Button for Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-1.5 p-1.5 sm:p-2 text-gray-200 hover:text-[#dfc57d] rounded-xl hover:bg-white/5 focus:outline-none cursor-pointer transition-colors"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
          >
            <span
              className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 transform origin-center ${
                mobileMenuOpen ? 'rotate-45 translate-y-2 bg-[#dfc57d]' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-current rounded-full transition-all duration-200 ${
                mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 transform origin-center ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-[#dfc57d]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Smooth Spring Animation */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { height: 'auto', opacity: 1, display: 'block' },
          closed: { height: 0, opacity: 0, transitionEnd: { display: 'none' } },
        }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="lg:hidden bg-[#0f131d]/95 backdrop-blur-xl border-b border-[#caa85d]/30 px-5 pt-3 pb-6 space-y-2.5 shadow-2xl overflow-hidden"
      >
        <a
          href="#hero"
          onClick={() => setMobileMenuOpen(false)}
          className="block px-3 py-2 rounded-lg text-base font-bold text-gray-200 hover:text-[#dfc57d] hover:bg-gray-800/60 transition-colors"
        >
          الرئيسية
        </a>
        <a
          href="#meals-highlight"
          onClick={() => setMobileMenuOpen(false)}
          className="block px-3 py-2 rounded-lg text-base font-bold text-gray-200 hover:text-[#dfc57d] hover:bg-gray-800/60 transition-colors"
        >
          الأكثر طلباً
        </a>
        <a
          href="#menu"
          onClick={() => setMobileMenuOpen(false)}
          className="block px-3 py-2 rounded-lg text-base font-bold text-gray-200 hover:text-[#dfc57d] hover:bg-gray-800/60 transition-colors"
        >
          قائمة المأكولات والأسعار
        </a>
        <a
          href="#about"
          onClick={() => setMobileMenuOpen(false)}
          className="block px-3 py-2 rounded-lg text-base font-bold text-gray-200 hover:text-[#dfc57d] hover:bg-gray-800/60 transition-colors"
        >
          عن العالمية
        </a>
        <a
          href="#reviews"
          onClick={() => setMobileMenuOpen(false)}
          className="block px-3 py-2 rounded-lg text-base font-bold text-gray-200 hover:text-[#dfc57d] hover:bg-gray-800/60 transition-colors"
        >
          تقييمات العملاء على خرائط Google
        </a>
        <a
          href="#location"
          onClick={() => setMobileMenuOpen(false)}
          className="block px-3 py-2 rounded-lg text-base font-bold text-gray-200 hover:text-[#dfc57d] hover:bg-gray-800/60 transition-colors"
        >
          الموقع والتواصل
        </a>

        <div className="pt-3 border-t border-gray-800/80 flex flex-col gap-2.5">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPdfModal();
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] text-[#12151d] font-black py-2.5 rounded-full text-sm shadow-md active:scale-95 transition-transform"
          >
            <FileDown className="w-4 h-4" />
            <span>تحميل المنيو الكامل PDF</span>
          </button>
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="flex items-center justify-center gap-2 bg-[#be3426] text-white py-2.5 rounded-full text-sm font-black font-mono shadow-md shadow-red-900/40 active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>اتصل للطلب: {RESTAURANT_INFO.displayPhone}</span>
          </a>
        </div>
      </motion.div>
    </header>
  );
};
