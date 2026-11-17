import React from 'react';
import { Phone, MessageCircle, ShoppingBag, FileDown } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface StickyMobileBarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPdfModal: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  cartCount,
  onOpenCart,
  onOpenPdfModal,
}) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161a25]/95 backdrop-blur-md border-t border-[#caa85d]/30 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl">
      {/* Call Button (Calm satin gold) */}
      <a
        href={`tel:${RESTAURANT_INFO.phone}`}
        className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] text-[#12151d] font-black py-2.5 px-2 rounded-lg text-xs shadow-md shadow-black/30"
        aria-label="اتصل للطلب الآن"
      >
        <Phone className="w-3.5 h-3.5 fill-current" />
        <span>اتصل: {RESTAURANT_INFO.displayPhone}</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={RESTAURANT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500 text-white font-black py-2.5 px-2 rounded-lg text-xs shadow-md shadow-emerald-950/30"
        aria-label="اطلب عبر واتساب"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>واتساب</span>
      </a>

      {/* PDF Button */}
      <button
        onClick={onOpenPdfModal}
        className="flex items-center justify-center p-2.5 bg-[#202534] text-amber-300 rounded-lg border border-gray-700"
        aria-label="تحميل المنيو PDF"
        title="تحميل المنيو PDF"
      >
        <FileDown className="w-4 h-4" />
      </button>

      {/* Cart Button */}
      <button
        onClick={onOpenCart}
        className="relative flex items-center justify-center p-2.5 bg-[#202534] text-amber-300 rounded-lg border border-gray-700"
        aria-label="فتح سلة الطلب"
      >
        <ShoppingBag className="w-4 h-4" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};
