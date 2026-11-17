import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  Check,
  Eye,
  Utensils,
  Sparkles,
  X,
  FileDown,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from 'lucide-react';
import {
  CATEGORIES,
  MENU_ITEMS,
  ROLL_SUBCATEGORIES,
  BOXES_SUBCATEGORIES,
  CategoryInfo,
} from '../data/restaurantData';
import { MenuItem, PriceOption, filterMenuItems, formatEGP, calculateItemPrice } from '../utils/orderCalculations';
import {
  paginateGroupedMenu,
  INITIAL_ALL_MENU_LIMIT,
  ALL_MENU_LOAD_STEP,
} from '../utils/menuPagination';

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
  const [allVisibleLimit, setAllVisibleLimit] = useState<number>(INITIAL_ALL_MENU_LIMIT);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubCategory('all');
    setAllVisibleLimit(INITIAL_ALL_MENU_LIMIT);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setAllVisibleLimit(INITIAL_ALL_MENU_LIMIT);
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

  const paginatedAll = useMemo(() => {
    if (!groupedSections) return null;
    return paginateGroupedMenu(groupedSections, allVisibleLimit);
  }, [groupedSections, allVisibleLimit]);

  const handleOptionChange = (itemId: string, option: PriceOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [itemId]: option,
    }));
  };

  const handleAdd = (item: MenuItem) => {
    const chosenOption = selectedOptions[item.id] || (item.options && item.options[0]);
    onAddToCart(item, chosenOption, 1);

    setAddedAnimation((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [item.id]: false }));
    }, 1100);
  };

  const renderMenuCard = (item: MenuItem) => {
    const activeOption = selectedOptions[item.id] || (item.options && item.options[0]);
    const currentPrice = calculateItemPrice(item, activeOption);
    const isAdded = addedAnimation[item.id];

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4 }}
        className="bg-[#0b101b]/65 hover:bg-[#111726]/75 backdrop-blur-xl rounded-2xl border border-white/15 hover:border-[#caa85d]/50 p-4 sm:p-5 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors group transform-gpu"
      >
        <div>
          {/* Top row with badges and original photo preview button */}
          <div className="flex items-start justify-between gap-2 mb-2.5">
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
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onOpenLightbox(item.menuImage!, item.name)}
                className="flex items-center gap-1 text-[11px] font-bold text-[#dfc57d] bg-[#caa85d]/15 hover:bg-[#caa85d]/25 border border-[#caa85d]/30 px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0"
                title="عرض صورة المنيو الأصلية"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>المنيو الأصلي</span>
              </motion.button>
            )}
          </div>

          {/* Dish Name */}
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#dfc57d] transition-colors mb-1 leading-snug">
            {item.name}
          </h3>
          {item.nameEn && <p className="text-xs text-gray-400 mb-2 font-sans">{item.nameEn}</p>}

          {/* Description if present */}
          {item.description && (
            <p className="text-xs text-gray-300 leading-relaxed mb-3 line-clamp-2">{item.description}</p>
          )}

          {/* Bread / Option Selector */}
          {item.options && item.options.length > 1 && (
            <div className="mb-3.5">
              <label className="block text-[11px] font-semibold text-gray-400 mb-1.5">
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
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between border transition-colors cursor-pointer ${
                        isOptActive
                          ? 'bg-[#caa85d]/20 border-[#caa85d] text-[#dfc57d]'
                          : 'bg-[#080c14]/55 border-white/12 text-gray-200 hover:bg-white/[0.08]'
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
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2.5 mt-2">
          <div>
            <span className="text-[11px] text-gray-400 block">السعر:</span>
            <span className="text-xl sm:text-2xl font-black text-[#dfc57d] font-mono tabular-nums">
              {formatEGP(currentPrice)}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleAdd(item)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-black text-xs sm:text-sm transition-colors cursor-pointer ${
              isAdded
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/30'
                : 'bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] hover:from-[#d5b368] hover:via-[#caa85d] hover:to-[#b39146] text-[#12151d] shadow-md shadow-black/30'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>تمت الإضافة</span>
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
  };

  const activeSubCategories =
    selectedCategory === 'rolls'
      ? ROLL_SUBCATEGORIES
      : selectedCategory === 'boxes_platters'
        ? BOXES_SUBCATEGORIES
        : null;

  return (
    <section id="menu" className="py-14 lg:py-16 bg-[#131826] relative overflow-hidden [overflow-anchor:none]">
      {/* Subtle Ambient Glows for Frosted Glass Cards */}
      <div className="absolute top-32 left-1/4 w-[28rem] h-[28rem] bg-[#caa85d]/14 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-[28rem] h-[28rem] bg-blue-500/12 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#caa85d]/15 border border-[#caa85d]/30 text-[#dfc57d] text-xs font-bold mb-2.5">
            <Utensils className="w-3.5 h-3.5 text-[#caa85d]" />
            <span>قائمة الطعام والأسعار الرسمية ({MENU_ITEMS.length} صنف)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            تشكيلة أطباق وسندوتشات <span className="text-[#dfc57d]">العالمية</span>
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            المنيو الكامل بكل أقسامه وأسعاره المحدثة لكافة أنواع الخبز (شامي، كيزر، بلدي، سوري، وفرنساوي).
          </p>
        </motion.div>

        {/* Search Bar + PDF Download & Mobile Filter Action Banner */}
        <div className="max-w-3xl mx-auto mb-5 sm:mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="ابحث عن أي صنف: كفتة، كيري، شاورما، فول، طعمية، برجر، رول..."
              className="w-full bg-[#0b101b]/65 backdrop-blur-xl border border-white/15 rounded-xl pr-11 pl-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#caa85d] transition-colors text-xs sm:text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white cursor-pointer"
                aria-label="مسح البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:flex items-center gap-2.5 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenPdfModal}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] hover:from-[#d5b368] hover:via-[#caa85d] hover:to-[#b39146] text-[#12151d] font-black px-3 sm:px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md whitespace-nowrap cursor-pointer"
            >
              <FileDown className="w-4 h-4 shrink-0" />
              <span>تحميل المنيو PDF</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              data-testid="mobile-filter-toggle"
              aria-expanded={isMobileFiltersOpen}
              onClick={() => setIsMobileFiltersOpen((prev) => !prev)}
              className={`sm:hidden inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold border backdrop-blur-xl whitespace-nowrap transition-colors cursor-pointer ${
                isMobileFiltersOpen || selectedCategory !== 'all'
                  ? 'bg-[#caa85d]/20 border-[#caa85d]/65 text-[#dfc57d] shadow-md'
                  : 'bg-[#0b101b]/65 border-white/15 text-gray-200 hover:text-white hover:border-white/30'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 shrink-0 text-[#caa85d]" />
              <span>تصفية</span>
              {selectedCategory !== 'all' && (
                <span className="w-2 h-2 rounded-full bg-[#dfc57d] shrink-0" aria-hidden="true" />
              )}
              <ChevronDown
                className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                  isMobileFiltersOpen ? 'rotate-180' : ''
                }`}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Expandable Category Filter Panel */}
        <AnimatePresence initial={false}>
          {isMobileFiltersOpen && (
            <motion.div
              key="mobile-filter-panel"
              data-testid="mobile-filter-panel"
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="sm:hidden overflow-hidden mb-6"
            >
              <div className="bg-[#0b101b]/75 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="flex items-center justify-between mb-3 px-0.5">
                  <span className="text-xs font-bold text-[#dfc57d] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>اختر التصنيف</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer"
                    aria-label="إغلاق التصنيف"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleCategorySelect('all');
                      setIsMobileFiltersOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] text-[#12151d] shadow-md font-black'
                        : 'bg-[#080c14]/65 text-gray-200 hover:text-white border border-white/12'
                    }`}
                  >
                    <span>الكل (جميع الأصناف)</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full ${
                        selectedCategory === 'all'
                          ? 'bg-[#12151d]/20 text-[#12151d] font-bold'
                          : 'bg-white/10 text-gray-200'
                      }`}
                    >
                      {MENU_ITEMS.length}
                    </span>
                  </button>

                  {CATEGORIES.map((cat) => {
                    const count = MENU_ITEMS.filter((i) => i.category === cat.id).length;
                    const isSelected = selectedCategory === cat.id;

                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => {
                          handleCategorySelect(cat.id);
                          setIsMobileFiltersOpen(false);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] text-[#12151d] shadow-md font-black'
                            : 'bg-[#080c14]/65 text-gray-200 hover:text-white border border-white/12'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${
                            isSelected ? 'bg-[#12151d]/20 text-[#12151d] font-bold' : 'bg-white/10 text-gray-200'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop & Tablet Category Tabs + Shared Sub-Category Filter Row */}
        <div className={activeSubCategories ? 'mb-7' : 'hidden sm:block mb-7'}>
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCategorySelect('all')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] text-[#12151d] shadow-md font-black'
                  : 'bg-[#0b101b]/65 backdrop-blur-md text-gray-200 hover:bg-[#111726]/80 hover:text-white border border-white/15'
              }`}
            >
              الكل ({MENU_ITEMS.length})
            </motion.button>

            {CATEGORIES.map((cat) => {
              const count = MENU_ITEMS.filter((i) => i.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] text-[#12151d] shadow-md font-black'
                      : 'bg-[#0b101b]/65 backdrop-blur-md text-gray-200 hover:bg-[#111726]/80 hover:text-white border border-white/15'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-[#12151d]/20 text-[#12151d] font-bold' : 'bg-white/10 text-gray-200'
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Sub-Category Filter Row */}
          {activeSubCategories && (
            <div className="sm:mt-3.5 sm:pt-3.5 sm:border-t sm:border-gray-800/80 flex flex-wrap items-center justify-center gap-2">
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
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                      isSubSelected
                        ? 'bg-[#caa85d]/20 border-[#caa85d] text-[#dfc57d]'
                        : 'bg-[#0b101b]/65 backdrop-blur-md border-white/15 text-gray-200 hover:text-white hover:border-white/30'
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
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-gray-300 mb-6 bg-[#0b101b]/65 backdrop-blur-xl px-4 py-2.5 rounded-xl border border-white/15">
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
                setAllVisibleLimit(INITIAL_ALL_MENU_LIMIT);
              }}
              className="text-[#dfc57d] hover:underline font-bold cursor-pointer"
            >
              إلغاء التصفية وعرض الكل
            </button>
          </div>
        )}

        {/* Items Display */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-14 bg-[#0b101b]/65 backdrop-blur-xl rounded-2xl border border-white/15 p-6 shadow-xl">
            <Utensils className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-200 mb-1.5">
              {globalSearchMatchesCount > 0
                ? `لا توجد نتائج لـ "${searchQuery}" داخل قسم ${CATEGORIES.find((c) => c.id === selectedCategory)?.name}`
                : 'لم يتم العثور على أطباق مطابقة'}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-5">
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
                  className="px-5 py-2.5 bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] text-[#12151d] font-black rounded-xl text-xs sm:text-sm hover:from-[#d5b368] hover:to-[#b39146] transition-colors cursor-pointer"
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
                className="px-5 py-2.5 bg-[#242b3b] border border-gray-700 text-gray-200 font-bold rounded-xl text-xs sm:text-sm hover:bg-[#2d3548] transition-colors cursor-pointer"
              >
                عرض جميع الأصناف ({MENU_ITEMS.length})
              </button>
            </div>
          </div>
        ) : paginatedAll ? (
          /* Paginated Menu Grouped by Category when 'All' is active without search */
          <div className="space-y-10 [overflow-anchor:none]">
            {paginatedAll.visibleGroups.map(
              ({
                category,
                items,
                totalInCategory,
              }: {
                category: CategoryInfo;
                items: MenuItem[];
                totalInCategory: number;
              }) => (
                <div key={category.id} className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#caa85d]/25">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-xl sm:text-2xl font-black text-white">{category.name}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#caa85d]/15 border border-[#caa85d]/30 text-[#dfc57d] text-xs font-bold">
                          {items.length < totalInCategory
                            ? `${items.length} من ${totalInCategory}`
                            : `${totalInCategory} صنف`}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{category.subtitle}</p>
                    </div>
                    <button
                      onClick={() => handleCategorySelect(category.id)}
                      className="self-start sm:self-auto text-xs font-bold text-[#dfc57d] hover:text-white bg-[#0b101b]/65 hover:bg-[#111726]/80 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      عرض هذا القسم كاملاً ({totalInCategory})
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((item) => renderMenuCard(item))}
                  </div>
                </div>
              )
            )}

            {/* Show More / Show Less Pagination Bar */}
            <div
              data-testid="menu-all-pagination"
              className="pt-5 flex flex-col items-center justify-center gap-3 border-t border-white/10 [overflow-anchor:none]"
            >
              <p className="text-xs sm:text-sm text-gray-400">
                يتم عرض <strong className="text-[#dfc57d]">{paginatedAll.shownCount}</strong> من إجمالي{' '}
                <strong className="text-white">{paginatedAll.totalCount}</strong> صنف
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {paginatedAll.hasMore && (
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      const prevScrollY = window.scrollY;
                      setAllVisibleLimit((prev) => prev + ALL_MENU_LOAD_STEP);
                      window.requestAnimationFrame(() => {
                        if (Math.abs(window.scrollY - prevScrollY) > 4) {
                          window.scrollTo({ top: prevScrollY, behavior: 'instant' });
                        }
                      });
                    }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] hover:from-[#d5b368] hover:via-[#caa85d] hover:to-[#b39146] text-[#12151d] font-black px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg transition-colors cursor-pointer"
                  >
                    <ChevronDown className="w-4 h-4" />
                    <span>عرض المزيد (متبقي {paginatedAll.remainingCount} صنف)</span>
                  </motion.button>
                )}

                {allVisibleLimit > INITIAL_ALL_MENU_LIMIT && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setAllVisibleLimit(INITIAL_ALL_MENU_LIMIT);
                      window.requestAnimationFrame(() => {
                        const paginationEl = document.querySelector('[data-testid="menu-all-pagination"]');
                        paginationEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      });
                    }}
                    className="inline-flex items-center gap-1.5 bg-[#0b101b]/65 hover:bg-[#111726]/80 backdrop-blur-md border border-white/15 text-gray-200 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <ChevronUp className="w-4 h-4" />
                    <span>عرض أقل</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Filtered Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => renderMenuCard(item))}
          </div>
        )}
      </div>
    </section>
  );
};
