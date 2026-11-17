import React, { useState, useEffect, useRef } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'motion/react';
import { Phone, ShoppingBag, FileDown } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getActiveNavSection } from '../utils/scrollSpy';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPdfModal: () => void;
}

const TRACKED_SECTIONS = [
  { elementId: 'hero', navId: 'home' },
  { elementId: 'meals-highlight', navId: 'meals' },
  { elementId: 'menu', navId: 'menu' },
  { elementId: 'about', navId: 'about' },
  { elementId: 'reviews', navId: 'reviews' },
  { elementId: 'location', navId: 'contact' },
];

const NAV_ITEMS = [
  { navId: 'home', href: '#hero', label: 'الرئيسية', mobileLabel: 'الرئيسية' },
  { navId: 'meals', href: '#meals-highlight', label: 'الأكثر طلباً', mobileLabel: 'الأكثر طلباً' },
  { navId: 'menu', href: '#menu', label: 'القائمة', mobileLabel: 'قائمة المأكولات والأسعار' },
  { navId: 'about', href: '#about', label: 'عن المطعم', mobileLabel: 'عن العالمية' },
  { navId: 'reviews', href: '#reviews', label: 'تقييمات العملاء', mobileLabel: 'تقييمات العملاء على خرائط Google' },
  { navId: 'contact', href: '#location', label: 'تواصل معنا', mobileLabel: 'تواصل معنا والموقع' },
];

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenPdfModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const clickLockUntilRef = useRef<number>(0);

  const navigateToSection = (
    e: React.MouseEvent<HTMLElement>,
    href: string,
    navId: string,
    closeDrawer: boolean = false
  ) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    clickLockUntilRef.current = Date.now() + 900;
    setActiveNav(navId);

    const performScroll = () => {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const headerOffset = window.innerWidth >= 1024 ? 92 : 80;
        const targetTop =
          targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth',
        });
      }
      if (window.location.hash !== href) {
        window.history.replaceState(null, '', href);
      }
    };

    if (closeDrawer) {
      setMobileMenuOpen(false);
      window.setTimeout(performScroll, 60);
    } else {
      performScroll();
    }
  };

  useEffect(() => {
    let rafId: number | null = null;

    const updateActiveNav = () => {
      rafId = null;
      if (Date.now() < clickLockUntilRef.current) return;

      const positions = TRACKED_SECTIONS.map(({ elementId, navId }) => {
        const el = document.getElementById(elementId);
        return {
          navId,
          top: el ? el.getBoundingClientRect().top : Infinity,
        };
      });

      const nextActive = getActiveNavSection(
        positions,
        window.scrollY,
        window.innerHeight,
        document.documentElement.scrollHeight,
        150
      );

      setActiveNav((prev) => (prev === nextActive ? prev : nextActive));
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateActiveNav);
    };

    updateActiveNav();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className="fixed top-3 sm:top-4 inset-x-3 sm:inset-x-6 z-[45] pointer-events-none">
      {/* Floating Translucent Pill Navigation Bar */}
      <div className="pointer-events-auto max-w-6xl xl:max-w-[1320px] mx-auto rounded-full bg-[#0b101b]/55 backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.45),0_0_0_1px_rgba(202,168,93,0.08)] px-3 sm:px-5 h-13 sm:h-15 flex items-center justify-between gap-2 sm:gap-4 transition-colors">
        {/* Brand Zone (Right side in RTL) */}
        <a
          href="#hero"
          onClick={(e) => navigateToSection(e, '#hero', 'home', mobileMenuOpen)}
          className="flex items-center gap-2 sm:gap-2.5 group shrink-0 pr-1"
        >
          <div className="flex flex-col text-right">
            <span className="text-lg sm:text-xl font-black text-[#dfc57d] tracking-wide font-['Tajawal',sans-serif] leading-tight">
              العالمية
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#caa85d]/85 font-bold tracking-wider">
              كافيه & ريستورانت
            </span>
          </div>

          {/* Ornate Gold Circular Badge */}
          <div className="relative w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-[#9a7a35] via-[#dfc57d] to-[#caa85d] shadow-md shadow-black/40 shrink-0">
            <div className="w-full h-full rounded-full bg-[#121620] flex items-center justify-center overflow-hidden border border-[#caa85d]/40">
              <img
                src={RESTAURANT_INFO.logo}
                alt="Al Alamia Emblem"
                className="w-full h-full object-cover rounded-full filter contrast-125 brightness-95"
              />
            </div>
          </div>
        </a>

        {/* Center Navigation Links with Smooth Sliding Color Glow & Underline */}
        <LayoutGroup id="desktop-header-nav">
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 text-sm font-bold">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.navId;
              return (
                <motion.a
                  key={item.navId}
                  href={item.href}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => navigateToSection(e, item.href, item.navId)}
                  className={`relative px-3 py-1.5 rounded-full transition-colors duration-300 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#f6e3a1] drop-shadow-[0_0_10px_rgba(223,197,125,0.55)]'
                      : 'text-gray-200 hover:text-[#dfc57d]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#caa85d]/15 via-[#dfc57d]/25 to-[#caa85d]/15 border border-[#caa85d]/30 shadow-[0_0_18px_rgba(223,197,125,0.2)] -z-10"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.75 }}
                      className="absolute -bottom-0.5 right-3 left-3 h-[2.5px] rounded-full bg-gradient-to-r from-[#caa85d] via-[#f8ecc4] to-[#caa85d] shadow-[0_0_12px_rgba(223,197,125,0.85)]"
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>
        </LayoutGroup>

        {/* Action Controls (Left side in RTL) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pl-0.5">
          {/* Download PDF Menu Pill */}
          <button
            type="button"
            onClick={onOpenPdfModal}
            className="hidden xl:flex items-center gap-1.5 text-xs text-[#dfc57d] hover:text-white bg-[#caa85d]/10 hover:bg-[#caa85d]/20 border border-[#caa85d]/30 px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>منيو PDF</span>
          </button>

          {/* Red Phone Call Pill Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="inline-flex items-center gap-1.5 bg-[#be3426] hover:bg-[#a92c20] text-white font-black px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm shadow-lg shadow-red-950/40 transition-colors font-mono"
            aria-label="اتصل للطلب"
          >
            <Phone className="w-3.5 h-3.5 fill-current animate-pulse" />
            <span dir="ltr" className="hidden sm:inline">01101760700</span>
            <span className="sm:hidden font-sans whitespace-nowrap">اطلب</span>
          </motion.a>

          {/* Quick Cart button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2 rounded-full bg-[#1c2230]/85 hover:bg-[#252d40] border border-[#caa85d]/25 text-[#dfc57d] transition-colors cursor-pointer"
            aria-label="عرض سلة الطلبات"
          >
            <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#bfa054] text-slate-950 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Animated 3-Bar Hamburger Toggle Button for Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 p-1.5 text-gray-200 hover:text-[#dfc57d] rounded-full hover:bg-white/10 focus:outline-none cursor-pointer transition-colors touch-manipulation"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`w-4.5 h-0.5 bg-current rounded-full transition-all duration-300 transform origin-center ${
                mobileMenuOpen ? 'rotate-45 translate-y-2 bg-[#dfc57d]' : ''
              }`}
            />
            <span
              className={`w-4.5 h-0.5 bg-current rounded-full transition-all duration-200 ${
                mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            <span
              className={`w-4.5 h-0.5 bg-current rounded-full transition-all duration-300 transform origin-center ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-[#dfc57d]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Floating Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label="القائمة الرئيسية للهاتف"
            className="lg:hidden pointer-events-auto mt-2.5 max-w-6xl mx-auto rounded-2xl bg-[#0d121d]/95 backdrop-blur-2xl border border-[#caa85d]/30 px-4 pt-3 pb-4 space-y-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.navId;
              return (
                <a
                  key={item.navId}
                  href={item.href}
                  onClick={(e) => navigateToSection(e, item.href, item.navId, true)}
                  className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors touch-manipulation cursor-pointer ${
                    isActive
                      ? 'bg-[#caa85d]/15 text-[#f6e3a1] border border-[#caa85d]/30'
                      : 'text-gray-200 hover:text-[#dfc57d] hover:bg-white/5 active:bg-white/10'
                  }`}
                >
                  <span>{item.mobileLabel}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#dfc57d] shadow-[0_0_8px_rgba(223,197,125,0.8)]" />
                  )}
                </a>
              );
            })}

            <div className="pt-3 mt-1.5 border-t border-gray-800/80 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.setTimeout(onOpenPdfModal, 80);
                }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] text-[#12151d] font-black py-2.5 rounded-full text-sm shadow-md active:scale-95 transition-transform cursor-pointer touch-manipulation"
              >
                <FileDown className="w-4 h-4" />
                <span>تحميل المنيو الكامل PDF</span>
              </button>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#be3426] text-white py-2.5 rounded-full text-sm font-black font-mono shadow-md shadow-red-900/40 active:scale-95 transition-transform touch-manipulation"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>اتصل للطلب: {RESTAURANT_INFO.displayPhone}</span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
