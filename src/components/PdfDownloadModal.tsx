import React, { useState } from 'react';
import { X, FileDown, CheckCircle, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { generateAndDownloadMenuPdf } from '../utils/pdfGenerator';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface PdfDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfDownloadModal: React.FC<PdfDownloadModalProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number; title: string }>({
    current: 0,
    total: 18,
    title: '',
  });
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleStartDownload = async () => {
    setIsGenerating(true);
    setIsDone(false);
    try {
      await generateAndDownloadMenuPdf((current, total, title) => {
        setProgress({ current, total, title });
      });
      setIsDone(true);
    } catch (err) {
      console.error('Error generating PDF', err);
      alert('حدث خطأ أثناء تحميل الملف، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsGenerating(false);
    }
  };

  const percentage = progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={isGenerating ? undefined : onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#181d27] border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-right overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative ambient top glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        {!isGenerating && (
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <FileDown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              تحميل المنيو الرسمي بصيغة PDF
            </h3>
            <p className="text-xs text-amber-300/80 font-medium">
              مطعم وكافيه العالمية ٢ - السويس
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mb-6">
          يمكنك تحميل وتصفح المنيو المصور الكامل أوفلاين في أي وقت. يشمل الملف جميع لوحات الأسعار الرسمية لجميع الأقسام: المشويات، السندوتشات، الرولات، الفول والطعمية، والحلويات.
        </p>

        {/* Features of PDF */}
        <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs text-gray-300 bg-[#13161f] p-3.5 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>17 صفحة عالية الدقة</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
            <span>شامل كافة الأسعار</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>محدث بالكامل 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>أرقام الطلب المباشر</span>
          </div>
        </div>

        {/* Progress or Actions */}
        {isGenerating ? (
          <div className="space-y-3 py-3">
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span className="flex items-center gap-2 font-medium">
                <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                جاري التجهيز: {progress.title}
              </span>
              <span className="font-mono font-bold text-amber-400">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden border border-gray-700">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-400 text-center">
              يتم دمج الصور الأصلية بجودة فائقة، برجاء الانتظار ثوانٍ معدودة...
            </p>
          </div>
        ) : isDone ? (
          <div className="text-center py-4 space-y-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                تم تحميل المنيو بنجاح!
              </h4>
              <p className="text-xs text-gray-400">
                تم حفظ ملف <span className="text-amber-400 font-mono">منيو-مطعم-العالمية-السويس.pdf</span> في جهازك.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleStartDownload}
                className="flex-1 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold rounded-xl transition-colors"
              >
                إعادة التحميل
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl transition-colors"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleStartDownload}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black py-3.5 px-6 rounded-xl text-sm shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileDown className="w-5 h-5" />
              <span>بدء تحميل ملف الـ PDF الآن</span>
            </button>
            <p className="text-[11px] text-gray-500 text-center">
              الملف خفيف وسريع التحميل ومتوافق مع جميع الهواتف وأجهزة الكمبيوتر.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
