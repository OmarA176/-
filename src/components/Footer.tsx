import React from 'react';
import { Phone, MapPin, MessageCircle, Heart, FileDown } from 'lucide-react';
import { RESTAURANT_INFO, CATEGORIES } from '../data/restaurantData';

interface FooterProps {
  onOpenPdfModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPdfModal }) => {
  return (
    <footer className="bg-[#0e1118] border-t border-amber-500/20 pt-14 pb-24 sm:pb-14 text-gray-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={RESTAURANT_INFO.logo}
                alt={RESTAURANT_INFO.name}
                className="w-10 h-10 rounded-full object-cover border border-amber-400/50"
              />
              <span className="text-base font-black text-gold-gradient">
                {RESTAURANT_INFO.name}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              المذاق المصري الأصيل بلمسة عصرية وجودة عالمية. أشهى المشويات، السندوتشات والوجبات في قلب السويس.
            </p>
            {onOpenPdfModal && (
              <button
                onClick={onOpenPdfModal}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-amber-300 border border-orange-500/40 text-xs font-bold transition-colors cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>تحميل قائمة الطعام PDF</span>
              </button>
            )}
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">أقسام القائمة</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <a href="#menu" className="hover:text-amber-300 transition-colors">
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">أصناف مميزة</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(5).map((cat) => (
                <li key={cat.id}>
                  <a href="#menu" className="hover:text-amber-300 transition-colors">
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white mb-3">تواصل وطلب سريع</h4>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="text-white hover:text-amber-300 font-mono font-bold"
              >
                {RESTAURANT_INFO.formattedPhone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 font-medium"
              >
                واتساب: {RESTAURANT_INFO.displayPhone}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 leading-relaxed font-medium"
              >
                السويس، مصر - مطعم العالمية ٢
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.name}. جميع الحقوق محفوظة.</p>
          <p className="flex items-center justify-center gap-1">
            <span>صُنع بحب</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
            <span>لأجل عشاق الأكل المصري الأصيل بالسويس</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
