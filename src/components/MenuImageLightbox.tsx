import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Download } from 'lucide-react';

interface MenuImageLightboxProps {
  imageUrl: string | null;
  title: string | null;
  onClose: () => void;
}

export const MenuImageLightbox: React.FC<MenuImageLightboxProps> = ({
  imageUrl,
  title,
  onClose,
}) => {
  if (!imageUrl) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-4xl w-full max-h-[92vh] bg-[#191e2b] border border-amber-400/40 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-[#1e2433]">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {title || 'صورة قائمة الطعام الرسمية'}
              </h3>
              <p className="text-xs text-amber-300 font-semibold">مطعم وكافيه العالمية ٢ - الأسعار الرسمية</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={imageUrl}
                download
                className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700 transition-colors"
                title="تحميل الصورة"
                aria-label="تحميل الصورة"
              >
                <Download className="w-4 h-4" />
              </a>
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700 transition-colors"
                title="فتح الصورة بالحجم الكامل"
                aria-label="فتح الصورة بالحجم الكامل"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image preview body */}
          <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/60">
            <img
              src={imageUrl}
              alt={title || 'قائمة أسعار مطعم العالمية'}
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg border border-gray-700"
            />
          </div>

          {/* Footer info */}
          <div className="px-6 py-3 bg-[#1e2433] border-t border-gray-700 flex items-center justify-between text-xs text-gray-300">
            <span>هذه الصورة مأخوذة مباشرة من المنيو الرسمي المعتمد لمطعم العالمية.</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-black cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
