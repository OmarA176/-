import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, UtensilsCrossed, FileDown, Sparkles, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onBrowseMenu: () => void;
  onOpenPdfModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBrowseMenu, onOpenPdfModal }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24"
    >
      {/* 
        BACKGROUND: The authentic Al Alamia restaurant logo is positioned as the rich full-bleed backdrop 
        with subtle scaling animation and a translucent, glassmorphic dark-gold gradient scrim.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.35 }}
          animate={{ scale: [1.08, 1.03, 1.08], opacity: [0.35, 0.45, 0.35] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          <img
            src={RESTAURANT_INFO.logo}
            alt="Al Alamia Restaurant Background Logo"
            className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.15]"
          />
        </motion.div>

        {/* Lighter, translucent glassmorphic gradient overlay so the logo shines through clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#131722]/80 via-[#131722]/75 to-[#131722]/98 backdrop-blur-[3px]" />

        {/* Radiant warm amber & golden light blooms */}
        <div className="absolute top-1/4 right-1/3 w-[32rem] h-[32rem] bg-amber-500/15 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 left-1/4 w-[28rem] h-[28rem] bg-orange-500/15 rounded-full blur-[90px] pointer-events-none" />
      </div>

      {/* Main Transparent Hero Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {/* Floating Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/10 mb-6 backdrop-blur-md animate-float-slow"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>مطعم وكافيه العالمية ٢ - أرقى وأشهى مذاق في السويس</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.18] tracking-tight mb-6 max-w-4xl"
        >
          طعم الأصالة المصرية،
          <span className="block text-gold-gradient mt-2 drop-shadow-lg">
            بجودة عالمية لا تُضاهى
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-gray-200 leading-relaxed mb-10 max-w-3xl font-medium drop-shadow-md"
        >
          أهلاً بكم في مطعم وكافيه العالمية! نقدم لكم تشكيلة فاخرة من وجبات الدجاج المشوي والكفتة على الفحم، سندوتشات اللحوم والطيور، ورولات التورتيلا المبتكرة، والفول والطعمية بالخلطات السرية.
        </motion.p>

        {/* Quick Action Buttons (Brightened Orange & Amber) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12 w-full sm:w-auto"
        >
          {/* Call to Order Button (Brightened warm orange) */}
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black px-7 py-4 rounded-xl text-base shadow-xl shadow-orange-500/30 transition-all cursor-pointer"
          >
            <Phone className="w-5 h-5 text-slate-950 fill-current animate-pulse" />
            <span>اتصل للطلب: {RESTAURANT_INFO.displayPhone}</span>
          </motion.a>

          {/* WhatsApp Order */}
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={RESTAURANT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-6 py-4 rounded-xl text-base shadow-xl shadow-emerald-950/40 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>اطلب عبر واتساب</span>
          </motion.a>

          {/* Download PDF Menu Button */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenPdfModal}
            className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold px-6 py-4 rounded-xl text-base shadow-xl shadow-red-950/40 transition-all cursor-pointer"
          >
            <FileDown className="w-5 h-5" />
            <span>تحميل المنيو PDF</span>
          </motion.button>

          {/* Browse Menu Button */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBrowseMenu}
            className="inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800/90 text-amber-300 border border-amber-400/40 font-bold px-6 py-4 rounded-xl text-base backdrop-blur-md transition-colors cursor-pointer"
          >
            <UtensilsCrossed className="w-5 h-5 text-amber-400" />
            <span>تصفح المنيو</span>
          </motion.button>
        </motion.div>

        {/* Quick Info Ribbon (Replacing the old heavy card with clean translucent badges) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pt-4"
        >
          <div className="bg-[#181d27]/75 hover:bg-[#181d27]/90 backdrop-blur-md rounded-xl p-3.5 border border-amber-500/20 text-center transition-all hover:border-amber-400/50 shadow-md">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono block">24/7</span>
            <span className="text-xs text-gray-300 font-medium">مفتوح طوال الأسبوع</span>
          </div>

          <div className="bg-[#181d27]/75 hover:bg-[#181d27]/90 backdrop-blur-md rounded-xl p-3.5 border border-amber-500/20 text-center transition-all hover:border-amber-400/50 shadow-md">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono block">+50</span>
            <span className="text-xs text-gray-300 font-medium">صنف وساندوتش ووجبة</span>
          </div>

          <div className="bg-[#181d27]/75 hover:bg-[#181d27]/90 backdrop-blur-md rounded-xl p-3.5 border border-amber-500/20 text-center transition-all hover:border-amber-400/50 shadow-md">
            <span className="text-xs text-amber-300 font-bold block mb-1 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              توصيل فوري
            </span>
            <span className="text-xs text-gray-300 font-medium">لكافة أحياء السويس</span>
          </div>

          <a
            href={RESTAURANT_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#181d27]/75 hover:bg-[#181d27]/90 backdrop-blur-md rounded-xl p-3.5 border border-amber-500/20 text-center transition-all hover:border-amber-400/50 shadow-md group block"
          >
            <span className="text-xs text-amber-400 font-bold block mb-1 flex items-center justify-center gap-1 group-hover:text-amber-300">
              <MapPin className="w-3.5 h-3.5" />
              فرع السويس
            </span>
            <span className="text-xs text-gray-300 font-medium group-hover:underline">عرض على الخريطة</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
