import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Plus, Check, Eye, Utensils, Sparkles, X, FileDown } from 'lucide-react';
import {
  CATEGORIES,
  MENU_ITEMS,
  ROLL_SUBCATEGORIES,
  BOXES_SUBCATEGORIES,
  CategoryInfo,
} from '../data/restaurantData';
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
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, PriceOption>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubCategory('all');
  };

  // Filter items using the fuzzy Arabic-normalized algorithm + optional subCategory
  const filteredItems = useMemo(() => {
    const base = filterMenuItems(MENU_ITEMS, selectedCategory, searchQuery);
    if (
      (selectedCategory === 'rolls' || selectedCategory === 'boxes_platters') &&
      selectedSubCategory !== 'all'
    ) {
      return base.filter((item) => item.subCategory === selectedSubCategory);
    }
    return base;
  }, [selectedCategory, selectedSubCategory, searchQuery]);

  // Check if searching within a category yielded 0 results while matches exist in other categories
  const globalSearchMatchesCount = useMemo(() => {
    if (!searchQuery.trim() || selectedCategory === 'all') return 0;
    return filterMenuItems(MENU_ITEMS, 'all', searchQuery).length;
  }, [searchQuery, selectedCategory]);

  // Group items by category when viewing 'all' without a search query
  const groupedSections = useMemo(() => {
    if (selectedCategory !== 'all' || searchQuery.trim() !== '') return null;
    return CATEGORIES.map((cat) => ({
      category: cat,
      items: MENU_ITEMS.filter((item) => item.category === cat.id),
    })).filter((group) => group.items.length > 0);
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

  const renderMenuCard = (item: MenuItem) => {
    const activeOption = selectedOptions[item.id] || (item.options && item.options[0]);
    const currentPrice = calculateItemPrice(item, activeOption);
    const isAdded = addedAnimation[item.id];

    return (
      <div
        key={item.id}
        className="bg-[#1b202c] hover:bg-[#202636] rounded-2xl border border-gray-700/80 p-5 flex flex-col justify-between shadow-lg shadow-black/25 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#caa85d]/40 group will-change-transform"
      >
        <div>
          {/* Top row with badges and original photo preview button */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {item.isNew && (
                <span className="bg-red-500/20 text-red-300 border border-red-500/40 text-[11px] font-bold px-2 py-0.5 rounded-md">
                  جديد
                </span>
              )}
              {item.isSpecial && (
                <span className="bg-[#caa85d]/20 text-[#dfc57d] border border-[#caa85d]/40 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#caa85d]" />
                  سبيشيال
                </span>
              )}
            </div>

            {item.menuImage && (
              <button
                onClick={() => onOpenLightbox(item.menuImage!, item.name)}
                className="flex items-center gap-1 text-[11px] font-bold text-[#dfc57d] bg-[#caa85d]/15 hover:bg-[#caa85d]/25 border border-[#caa85d]/30 px-2.5 py-1 rounded-md transition-colors cursor-pointer shrink-0"
                title="عرض صورة المنيو الأصلية"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>المنيو الأصلي</span>
              </button>
            )}
          </div>

          {/* Dish Name */}
          <h3 className="text-lg font-bold text-white group-hover:text-[#dfc57d] transition-colors mb-1 leading-snug">
            {item.name}
          </h3>
          {item.nameEn && <p className="text-xs text-gray-400 mb-2 font-sans">{item.nameEn}</p>}

          {/* Description if present */}
          {item.description && (
            <p className="text-xs text-gray-300 leading-relaxed mb-3">{item.description}</p>
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
                          ? 'bg-[#caa85d]/20 border-[#caa85d] text-[#dfc57d] shadow-sm'
                          : 'bg-[#151923] border-gray-700 text-gray-300 hover:bg-[#232938]'
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      <span className="text-[11px] text-[#dfc57d] font-mono font-black mr-1">
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
            <span className="text-2xl font-black text-[#dfc57d] font-mono drop-shadow">
              {formatEGP(currentPrice)}
            </span>
          </div>

          <button
            onClick={() => handleAdd(item)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer active:scale-95 ${
              isAdded
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                : 'bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] hover:from-[#d5b368] hover:via-[#caa85d] hover:to-[#b39146] text-[#12151d] shadow-md shadow-black/25'
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
          </button>
        </div>
      </div>
    );
  };

  const activeSubCategories =
    selectedCategory === 'rolls'
      ? ROLL_SUBCATEGORIES
      : selectedCategory === 'boxes_platters'
        ? BOXES_SUBCATEGORIES
        : null;

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#caa85d]/15 border border-[#caa85d]/30 text-[#dfc57d] text-xs font-bold mb-3">
            <Utensils className="w-3.5 h-3.5 text-[#caa85d]" />
            <span>قائمة الطعام والأسعار الرسمية الكاملة ({MENU_ITEMS.length} صنف)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            تشكيلة أطباق وسندوتشات <span className="text-[#dfc57d]">العالمية</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            المنيو الكامل بكل أقسامه وأسعاره المحدثة لكافة أنواع الخبز (شامي، كيزر، بلدي، سوري، وفرنساوي). يمكنك استعراض الأصناف أو تحميل المنيو كملف PDF.
          </p>
        </motion.div>

        {/* Search Bar + PDF Download Action Banner */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-3">
          {/* Smart Fuzzy Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أي صنف: كفتة، كيري، شاورما، فول، طعمية، باذنجان، برجر، رول..."
              className="w-full bg-[#1e2330] border border-gray-700/80 rounded-xl pr-12 pl-12 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#caa85d] transition-colors text-sm sm:text-base shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white cursor-pointer"
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] hover:from-[#d5b368] hover:via-[#caa85d] hover:to-[#b39146] text-[#12151d] font-black px-5 py-3.5 rounded-xl text-sm shadow-md shadow-black/30 whitespace-nowrap cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>تحميل المنيو PDF</span>
          </motion.button>
        </div>

        {/* All Category Tabs Clearly Visible (Wrapped Grid - Zero Hidden Categories!) */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {/* 'All' Tab */}
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] text-[#12151d] shadow-md shadow-black/25 font-black scale-[1.02]'
                  : 'bg-[#1e2330] text-gray-300 hover:bg-[#252b3b] hover:text-white border border-gray-700/60'
              }`}
            >
              الكل ({MENU_ITEMS.length})
            </button>

            {/* Individual Category Tabs */}
            {CATEGORIES.map((cat) => {
              const count = MENU_ITEMS.filter((i) => i.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] text-[#12151d] shadow-md shadow-black/25 font-black scale-[1.02]'
                      : 'bg-[#1e2330] text-gray-300 hover:bg-[#252b3b] hover:text-white border border-gray-700/60'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-[#12151d]/20 text-[#12151d] font-bold' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub-Category Filter Row for Rolls & Orders */}
          {activeSubCategories && (
            <div className="mt-4 pt-4 border-t border-gray-800/80 flex flex-wrap items-center justify-center gap-2">
              {activeSubCategories.map((sub) => {
                const subCount =
                  sub.id === 'all'
                    ? MENU_ITEMS.filter((i) => i.category === selectedCategory).length
                    : MENU_ITEMS.filter(
                        (i) => i.category === selectedCategory && i.subCategory === sub.id
                      ).length;
                const isSubSelected = selectedSubCategory === sub.id;

                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubCategory(sub.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      isSubSelected
                        ? 'bg-[#caa85d]/20 border-[#caa85d] text-[#dfc57d]'
                        : 'bg-[#1a1f2c] border-gray-700/70 text-gray-300 hover:text-white hover:border-gray-600'
                    }`}
                  >
                    {sub.label} ({subCount})
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Results Counter & Search Indicator */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400 mb-6 bg-[#1a1f2c] px-4 py-2.5 rounded-xl border border-gray-800">
            <span>
              عرض <strong className="text-[#dfc57d] font-bold">{filteredItems.length}</strong> صنف
              {searchQuery && ` لنتائج البحث عن: "${searchQuery}"`}
              {selectedCategory !== 'all' && ` في قسم: ${CATEGORIES.find((c) => c.id === selectedCategory)?.name}`}
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSubCategory('all');
              }}
              className="text-[#dfc57d] hover:underline font-bold cursor-pointer"
            >
              إلغاء التصفية وعرض الكل
            </button>
          </div>
        )}

        {/* Items Display */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#1a1f2c] rounded-2xl border border-gray-800 p-8 shadow-xl">
            <Utensils className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-200 mb-1">
              {globalSearchMatchesCount > 0
                ? `لا توجد نتائج لـ "${searchQuery}" داخل قسم ${CATEGORIES.find((c) => c.id === selectedCategory)?.name}`
                : 'لم يتم العثور على أطباق مطابقة'}
            </h3>
            <p className="text-gray-400 text-sm mb-5">
              {globalSearchMatchesCount > 0
                ? `يوجد ${globalSearchMatchesCount} صنف مطابق في باقي أقسام المنيو.`
                : 'جرب البحث بكلمات أخرى مثل "كفتة" أو "طعمية" أو "فول" أو "شاورما"'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {globalSearchMatchesCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubCategory('all');
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] text-[#12151d] font-black rounded-xl text-sm hover:from-[#d5b368] hover:to-[#b39146] transition-all cursor-pointer shadow-md"
                >
                  عرض نتائج "{searchQuery}" في كل الأقسام ({globalSearchMatchesCount})
                </button>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedSubCategory('all');
                }}
                className="px-5 py-2.5 bg-[#242b3b] border border-gray-700 text-gray-200 font-bold rounded-xl text-sm hover:bg-[#2d3548] transition-colors cursor-pointer"
              >
                عرض جميع الأصناف ({MENU_ITEMS.length})
              </button>
            </div>
          </div>
        ) : groupedSections ? (
          /* Full Complete Menu Grouped by Category when 'All' is active without search */
          <div className="space-y-14">
            {groupedSections.map(({ category, items }: { category: CategoryInfo; items: MenuItem[] }) => (
              <div key={category.id} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#caa85d]/25">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl font-black text-white">{category.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#caa85d]/15 border border-[#caa85d]/30 text-[#dfc57d] text-xs font-bold">
                        {items.length} صنف
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">{category.subtitle}</p>
                  </div>
                  <button
                    onClick={() => handleCategorySelect(category.id)}
                    className="self-start sm:self-auto text-xs font-bold text-[#dfc57d] hover:text-white bg-[#1e2330] hover:bg-[#252b3b] border border-gray-700/70 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    عرض هذا القسم فقط
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => renderMenuCard(item))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Filtered Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => renderMenuCard(item))}
          </div>
        )}
      </div>
    </section>
  );
};
