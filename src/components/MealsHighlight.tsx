import React from 'react';
import { motion } from 'motion/react';
import { Flame, Check, Plus, Phone } from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { MenuItem, formatEGP } from '../utils/orderCalculations';

interface MealsHighlightProps {
  onAddToCart: (item: MenuItem) => void;
}

export const MealsHighlight: React.FC<MealsHighlightProps> = ({ onAddToCart }) => {
  const meals = MENU_ITEMS.filter((item) => item.category === 'meals');

  return (
    <section id="meals-highlight" className="py-14 lg:py-16 bg-[#141822] border-t border-b border-[#caa85d]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#caa85d]/15 border border-[#caa85d]/35 text-[#dfc57d] text-xs font-bold mb-2.5">
              <Flame className="w-3.5 h-3.5 fill-current animate-pulse text-[#caa85d]" />
              <span>اختيارات الزبائن المفضلة</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              الأكثر <span className="text-[#dfc57d]">طلباً</span>
            </h2>
          </div>
          <p className="text-gray-300 text-xs sm:text-sm max-w-md leading-relaxed">
            الوجبات والمشويات الأكثر مبيعاً في العالمية؛ تُقدم ساخنة وطازجة مع أرز بسمتي متبل، خبز، طحينة، وسلطة بلدي أو كلوسلو.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
              className="bg-[#1b202c] rounded-2xl border border-gray-700/80 hover:border-[#caa85d]/50 p-5 flex flex-col justify-between transition-colors group shadow-lg shadow-black/20 transform-gpu"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-[#dfc57d] bg-[#caa85d]/15 px-2.5 py-0.5 rounded-md border border-[#caa85d]/30">
                    مشوي على الفحم
                  </span>
                  <span className="text-xl font-black text-[#dfc57d] font-mono tabular-nums">
                    {formatEGP(meal.basePrice)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#dfc57d] transition-colors mb-2">
                  {meal.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  {meal.description}
                </p>

                <div className="space-y-1.5 mb-5 text-xs text-gray-300 bg-[#141822] p-3 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>أرز بسمتي فاخر ومتبل</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>طحينة وسلطة خضراء طازجة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>خبز ساخن من الفرن</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-3.5 border-t border-gray-700/60">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onAddToCart(meal)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] hover:from-[#d5b368] hover:via-[#caa85d] hover:to-[#b39146] text-[#12151d] font-black py-2.5 px-3.5 rounded-xl text-xs sm:text-sm transition-colors shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة للسلة</span>
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="p-2.5 bg-[#242b3a] hover:bg-[#2d3648] text-[#dfc57d] hover:text-white border border-gray-700 rounded-xl transition-colors cursor-pointer"
                  title="اتصل لطلب هذه الوجبة فوراً"
                  aria-label={`اتصل لطلب ${meal.name}`}
                >
                  <Phone className="w-4 h-4 fill-current" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
