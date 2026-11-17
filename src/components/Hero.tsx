import React from 'react';
import { motion } from 'motion/react';
import { Phone, Star, MapPin, Bike } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onBrowseMenu: () => void;
  onOpenPdfModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBrowseMenu }) => {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-14 lg:pt-28 lg:pb-20 lg:min-h-[94vh]"
    >
      {/* HERO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.04 }}
          animate={{ scale: [1.04, 1.0, 1.04] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full will-change-transform transform-gpu"
        >
          <img
            src="/assets/aistudio/hero_foul_taameya.jpg"
            alt="فول وطعمية العالمية السويس"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.1]"
          />
        </motion.div>

        {/* Scrim that ensures crisp text readability while keeping food photography visible behind buttons on mobile & desktop */}
        <div className="absolute inset-0 bg-[#0b0e15]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131722] via-transparent via-25% to-[#090b10]/35" />

        {/* Ambient warm amber glow blooms */}
        <div className="hidden sm:block absolute top-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none animate-pulse-glow" />
        <div className="hidden sm:block absolute bottom-1/4 left-1/4 w-72 h-72 bg-orange-600/10 rounded-full blur-[80px] pointer-events-none" />
      </div>

      {/* Main Hero Content: 2-Column Responsive Grid */}
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 w-full py-2 sm:py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-14 xl:gap-20 items-center">
          {/* Right Column (In RTL: Column 1): Hero Headlines, Description, CTA Buttons, Pills */}
          <div className="lg:col-span-6 flex flex-col items-start text-right order-2 lg:order-1 lg:pl-4 xl:pl-8">
            {/* Rating Capsule Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/50 border border-[#caa85d]/35 text-[#e6d8bc] text-xs sm:text-sm font-medium shadow-lg mb-3.5 backdrop-blur-sm"
            >
              <Star className="w-3.5 h-3.5 text-[#caa85d] fill-[#caa85d] shrink-0" />
              <span>
                تقييم <strong className="font-bold text-white">4</strong> على خرائط جوجل من أكثر من{' '}
                <strong className="font-bold text-white">440</strong> زائر
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="flex flex-col items-start mb-3.5 text-right w-full"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] font-['Tajawal',sans-serif]">
                <span>مطعم وكافيه </span>
                <span className="relative inline-block text-[#dfc57d]">
                  العالمية
                  <span className="absolute -bottom-1 sm:-bottom-1.5 right-0 left-0 h-2 bg-[#caa85d]/30 rounded-full -z-10" />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed mb-5 sm:mb-7 max-w-xl font-medium drop-shadow-md text-right"
            >
              ذوق مصري أصيل في قلب السويس – سندوتشات الدوم والفول والطعمية والحواوشي والمشويات، بمكونات طازجة وأسعار في المتناول، على مدار 24 ساعة.
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-wrap items-center justify-start gap-3 sm:gap-4 mb-5 sm:mb-7 w-full"
            >
              {/* Primary Call Button */}
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] hover:from-[#d5b368] hover:via-[#caa85d] hover:to-[#b39146] text-[#12151d] font-black px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base shadow-lg shadow-black/40 transition-colors font-mono cursor-pointer whitespace-nowrap"
              >
                <span className="font-sans font-black">اطلب الآن —</span>
                <span dir="ltr">{RESTAURANT_INFO.displayPhone}</span>
                <Phone className="w-4 h-4 text-[#12151d] fill-current mr-0.5" />
              </motion.a>

              {/* Secondary Outline Menu Button */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBrowseMenu}
                className="inline-flex items-center justify-center gap-2 border border-[#caa85d]/55 bg-black/45 hover:bg-[#caa85d]/15 text-[#dfc57d] hover:text-[#f3e7cb] font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base backdrop-blur-sm transition-colors cursor-pointer shadow-lg whitespace-nowrap"
              >
                <span>تصفح القائمة الكاملة</span>
              </motion.button>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3 max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/45 border border-white/10 text-gray-200 text-xs sm:text-sm font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#caa85d] inline-block" />
                <span>خدمة 24 ساعة</span>
              </div>

              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/45 border border-white/10 hover:border-[#caa85d]/40 text-gray-200 hover:text-[#dfc57d] text-xs sm:text-sm font-semibold shadow-sm transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#caa85d]" />
                <span>فيصل – السويس</span>
              </a>

              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/45 border border-white/10 text-gray-200 text-xs sm:text-sm font-semibold shadow-sm">
                <Bike className="w-3.5 h-3.5 text-[#caa85d]" />
                <span>توصيل سريع للطلبات</span>
              </div>
            </motion.div>
          </div>

          {/* Left Column (In RTL: Column 2): Freestanding Luxury Satin Gold Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: -25 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 flex items-center justify-center lg:justify-end order-1 lg:order-2 lg:pr-6 xl:pr-12"
          >
            <div className="relative group flex items-center justify-center animate-float-slow w-full max-w-[205px] sm:max-w-[300px] lg:max-w-[420px]">
              <div className="hidden sm:block absolute inset-0 bg-[#caa85d]/10 rounded-3xl blur-2xl pointer-events-none group-hover:bg-[#caa85d]/18 transition-colors duration-500" />

              <div className="relative w-full flex items-center justify-center p-1 sm:p-3 select-none">
                <svg
                  viewBox="0 0 460 330"
                  className="w-full h-auto filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] select-none pointer-events-none"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="alamiaSatinGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f5e8c4" />
                      <stop offset="35%" stopColor="#dfc57d" />
                      <stop offset="70%" stopColor="#caa85d" />
                      <stop offset="100%" stopColor="#a38237" />
                    </linearGradient>
                    <linearGradient id="alamiaGoldText" x1="0%" y1="15%" x2="100%" y2="85%">
                      <stop offset="0%" stopColor="#fcf4db" />
                      <stop offset="35%" stopColor="#e2c984" />
                      <stop offset="75%" stopColor="#caa85d" />
                      <stop offset="100%" stopColor="#9e7e36" />
                    </linearGradient>
                  </defs>

                  <g stroke="url(#alamiaSatinGold)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M 230 46 C 220 28, 202 24, 192 36 C 182 48, 192 64, 212 60 C 224 58, 230 50, 230 50 C 230 50, 236 58, 248 60 C 268 64, 278 48, 268 36 C 258 24, 240 28, 230 46 Z" fill="url(#alamiaSatinGold)" fillOpacity="0.12" />
                    <path d="M 206 58 C 175 42, 138 52, 126 84 C 118 106, 134 124, 154 116 C 172 108, 172 88, 156 82 C 144 78, 134 86, 136 96" />
                    <path d="M 170 54 C 142 36, 102 46, 88 80 C 78 104, 94 126, 118 120 C 132 116, 134 102, 122 96 C 114 92, 104 98, 106 106" strokeWidth="2" />
                    <path d="M 254 58 C 285 42, 322 52, 334 84 C 342 106, 326 124, 306 116 C 288 108, 288 88, 304 82 C 316 78, 326 86, 324 96" />
                    <path d="M 290 54 C 318 36, 358 46, 372 80 C 382 104, 366 126, 342 120 C 328 116, 326 102, 338 96 C 346 92, 356 98, 354 106" strokeWidth="2" />
                    <path d="M 195 72 C 160 84, 120 106, 92 124" strokeWidth="1.8" />
                    <path d="M 265 72 C 300 84, 340 106, 368 124" strokeWidth="1.8" />
                  </g>

                  <g stroke="url(#alamiaSatinGold)" strokeWidth="2" strokeLinecap="round" fill="none">
                    <path d="M 72 134 C 64 134, 58 128, 62 122 C 66 116, 76 118, 76 126 C 76 132, 70 134, 62 134" strokeWidth="2" />
                    <circle cx="62" cy="134" r="3.5" fill="url(#alamiaSatinGold)" stroke="none" />
                    <line x1="78" y1="134" x2="382" y2="134" strokeWidth="2" />
                    <path d="M 388 134 C 396 134, 402 128, 398 122 C 394 116, 384 118, 384 126 C 384 132, 390 134, 398 134" strokeWidth="2" />
                    <circle cx="398" cy="134" r="3.5" fill="url(#alamiaSatinGold)" stroke="none" />
                  </g>

                  <text
                    x="230"
                    y="166"
                    textAnchor="middle"
                    fill="url(#alamiaGoldText)"
                    fontFamily="'Tajawal', 'Cairo', sans-serif"
                    fontWeight="900"
                    fontSize="30"
                    letterSpacing="2"
                  >
                    العـالـمـيـة
                  </text>

                  <text
                    x="230"
                    y="206"
                    textAnchor="middle"
                    fill="url(#alamiaGoldText)"
                    fontFamily="'Times New Roman', 'Playfair Display', Georgia, serif"
                    fontWeight="900"
                    fontSize="42"
                    letterSpacing="7"
                  >
                    AL ALAMIA
                  </text>

                  <text
                    x="230"
                    y="236"
                    textAnchor="middle"
                    fill="url(#alamiaGoldText)"
                    fontFamily="'Times New Roman', 'Playfair Display', Georgia, serif"
                    fontWeight="600"
                    fontStyle="italic"
                    fontSize="20"
                    letterSpacing="2.5"
                    opacity="0.95"
                  >
                    Cafe &amp; Restaurant
                  </text>

                  <g stroke="url(#alamiaSatinGold)" strokeWidth="2" strokeLinecap="round" fill="none">
                    <path d="M 72 254 C 64 254, 58 260, 62 266 C 66 272, 76 270, 76 262 C 76 256, 70 254, 62 254" strokeWidth="2" />
                    <circle cx="62" cy="254" r="3.5" fill="url(#alamiaSatinGold)" stroke="none" />
                    <line x1="78" y1="254" x2="382" y2="254" strokeWidth="2" />
                    <path d="M 388 254 C 396 254, 402 260, 398 266 C 394 272, 384 270, 384 262 C 384 256, 390 254, 398 254" strokeWidth="2" />
                    <circle cx="398" cy="254" r="3.5" fill="url(#alamiaSatinGold)" stroke="none" />
                  </g>

                  <g stroke="url(#alamiaSatinGold)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M 230 312 C 220 330, 202 334, 192 322 C 182 310, 192 294, 212 298 C 224 300, 230 308, 230 308 C 230 308, 236 300, 248 298 C 268 294, 278 310, 268 322 C 258 334, 240 330, 230 312 Z" fill="url(#alamiaSatinGold)" fillOpacity="0.12" />
                    <path d="M 206 300 C 175 316, 138 306, 126 274 C 118 252, 134 234, 154 242 C 172 250, 172 270, 156 276 C 144 280, 134 272, 136 262" />
                    <path d="M 170 304 C 142 322, 102 312, 88 278 C 78 254, 94 232, 118 238 C 132 242, 134 256, 122 262 C 114 266, 104 260, 106 252" strokeWidth="2" />
                    <path d="M 254 300 C 285 316, 322 306, 334 274 C 342 252, 326 234, 306 242 C 288 250, 288 270, 304 276 C 316 280, 326 272, 324 262" />
                    <path d="M 290 304 C 318 322, 358 312, 372 278 C 382 254, 366 232, 342 238 C 328 242, 326 256, 338 262 C 346 266, 356 260, 354 252" strokeWidth="2" />
                    <path d="M 195 286 C 160 274, 120 252, 92 234" strokeWidth="1.8" />
                    <path d="M 265 286 C 300 274, 340 252, 368 234" strokeWidth="1.8" />
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Call Button in Bottom Corner */}
      <motion.a
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        href={`tel:${RESTAURANT_INFO.phone}`}
        className="fixed bottom-5 left-5 z-30 hidden sm:inline-flex items-center gap-2 bg-[#be3426] hover:bg-[#a92c20] text-white font-black px-4 py-2.5 rounded-full text-sm shadow-2xl shadow-red-950/70 border border-red-500/30 transition-colors cursor-pointer group"
        aria-label="اتصل للطلب فورا"
      >
        <Phone className="w-4 h-4 fill-current group-hover:animate-bounce" />
        <span>اتصل للطلب</span>
      </motion.a>
    </section>
  );
};
