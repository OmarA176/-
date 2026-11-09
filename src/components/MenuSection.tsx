import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Check, Eye, Utensils, Sparkles, X, FileDown } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, PriceOption, filterMenuItems, formatEGP, calculateItemPrice } from '../utils/orderCalculations';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, option?: PriceOption, quantity?: number) => void;
  onOpenLightbox: (imageUrl: string, title: string) => void;
  onOpenPdfModal: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenLightbox,
  onOpenPdfModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, PriceOption>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  // Filter items
  const filteredItems = useMemo(() => {
    return filterMenuItems(MENU_ITEMS, selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  const handleOptionChange = (itemId: string, option: PriceOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [itemId]: option,
    }));
  };

  const handleAdd = (item: MenuItem) => {
    const chosenOption = selectedOptions[item.id] || (item.options && item.options[0]);
    onAddToCart(item, chosenOption, 1);

    // Trigger brief visual feedback
    setAddedAnimation((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu" className="py-20 bg-[#161a24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>قائمة الطعام والأسعار الرسمية المحدثة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            تشكيلة أطباق وسندوتشات <span className="text-gold-gradient">العالمية</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            جميع أسعارنا معلنة ومحدثة لكافة أنواع الخبز (شامي، كيزر، بلدي، وفرنساوي). يمكنك استعراض الأصناف أو تحميل المنيو كملف PDF.
          </p>
        </motion.div>

        {/* Search Bar + PDF Download Action Banner */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن وجبة، ساندوتش، كفتة، كيري، شاورما، فول..."
              className="w-full bg-[#1e2330] border border-gray-700/80 rounded-xl pr-12 pl-12 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors text-sm sm:text-base shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
                aria-label="مسح البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick PDF Download Button in toolbar */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenPdfModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black px-5 py-3.5 rounded-xl text-sm shadow-md shadow-orange-500/20 whitespace-nowrap cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>تحميل المنيو PDF</span>
          </motion.button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-md shadow-orange-500/25 font-black'
                : 'bg-[#1e2330] text-gray-300 hover:bg-[#252b3b] hover:text-white border border-gray-700/60'
            }`}
          >
            الكل ({MENU_ITEMS.length})
          </motion.button>
          {CATEGORIES.map((cat) => {
            const count = MENU_ITEMS.filter((i) => i.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-md shadow-orange-500/25 font-black'
                    : 'bg-[#1e2330] text-gray-300 hover:bg-[#252b3b] hover:text-white border border-gray-700/60'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-950/40 text-slate-900 font-bold' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Items Grid with Scroll Animations */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#1a1f2c] rounded-2xl border border-gray-800 p-8">
            <Utensils className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-200 mb-1">لم يتم العثور على أطباق مطابقة</h3>
            <p className="text-gray-400 text-sm mb-4">جرب البحث بكلمات أخرى مثل "كفتة" أو "طعمية" أو "فول"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-sm hover:bg-amber-400 transition-colors cursor-pointer"
            >
              عرض جميع الأصناف
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map((item, index) => {
                const activeOption = selectedOptions[item.id] || (item.options && item.options[0]);
                const currentPrice = calculateItemPrice(item, activeOption);
                const isAdded = addedAnimation[item.id];

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.35, delay: Math.min((index % 6) * 0.05, 0.3) }}
                    whileHover={{ y: -4, borderColor: 'rgba(251, 191, 36, 0.5)' }}
                    className="bg-[#1b202c] hover:bg-[#202636] rounded-2xl border border-gray-700/80 p-5 flex flex-col justify-between transition-colors group shadow-lg shadow-black/25"
                  >
                    <div>
                      {/* Top row with badges and original photo preview button */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {item.isNew && (
                            <span className="bg-red-500/25 text-red-300 border border-red-500/40 text-[11px] font-bold px-2 py-0.5 rounded-md">
                              جديد
                            </span>
                          )}
                          {item.isSpecial && (
                            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              سبيشيال
                            </span>
                          )}
                        </div>

                        {item.menuImage && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onOpenLightbox(item.menuImage!, item.name)}
                            className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                            title="عرض صورة المنيو الأصلية"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>المنيو الأصلي</span>
                          </motion.button>
                        )}
                      </div>

                      {/* Dish Name */}
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
                        {item.name}
                      </h3>
                      {item.nameEn && (
                        <p className="text-xs text-gray-400 mb-2 font-sans">{item.nameEn}</p>
                      )}

                      {/* Description if present */}
                      {item.description && (
                        <p className="text-xs text-gray-300 leading-relaxed mb-3">
                          {item.description}
                        </p>
                      )}

                      {/* Bread / Option Selector */}
                      {item.options && item.options.length > 1 && (
                        <div className="mb-4">
                          <label className="block text-[11px] font-semibold text-gray-300 mb-1.5">
                            اختر نوع العيش أو الحجم:
                          </label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {item.options.map((opt) => {
                              const isOptActive =
                                (activeOption && activeOption.label === opt.label) ||
                                (!activeOption && opt.label === item.options![0].label);

                              return (
                                <button
                                  key={opt.label}
                                  onClick={() => handleOptionChange(item.id, opt)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                                    isOptActive
                                      ? 'bg-amber-400/25 border-amber-400 text-amber-200 shadow-sm'
                                      : 'bg-[#151923] border-gray-700 text-gray-300 hover:bg-[#232938]'
                                  }`}
                                >
                                  <span className="truncate">{opt.label}</span>
                                  <span className="text-[11px] text-amber-300 font-mono font-black mr-1">
                                    {opt.price} ج
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price & Add Action Row */}
                    <div className="pt-3 border-t border-gray-700/60 flex items-center justify-between gap-3 mt-4">
                      <div>
                        <span className="text-[11px] text-gray-400 block">السعر الرسمي:</span>
                        <span className="text-2xl font-black text-amber-300 font-mono drop-shadow">
                          {formatEGP(currentPrice)}
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAdd(item)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                            : 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 shadow-md shadow-orange-500/20'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>تمت الإضافة!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>أضف للطلب</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
