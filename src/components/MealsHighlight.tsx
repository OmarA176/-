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
    <section id="meals-highlight" className="py-20 bg-[#141822] border-t border-b border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold mb-3 shadow-sm">
              <Flame className="w-3.5 h-3.5 fill-current animate-pulse text-orange-400" />
              <span>مشويات على الفحم يومياً</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              وجبات وميكس جريل <span className="text-gold-gradient">العالمية</span>
            </h2>
          </div>
          <p className="text-gray-300 text-sm sm:text-base max-w-md leading-relaxed">
            جميع الوجبات تُقدم ساخنة وطازجة مع أرز بسمتي متبل، خبز، طحينة، وسلطة بلدي أو كلوسلو.
          </p>
        </motion.div>

        {/* Feature Grid with Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, borderColor: 'rgba(251, 191, 36, 0.5)' }}
              className="bg-[#1b202c] rounded-2xl border border-gray-700/80 p-6 flex flex-col justify-between transition-colors group shadow-xl shadow-black/20"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-orange-300 bg-orange-500/20 px-3 py-1 rounded-md border border-orange-400/30">
                    مشوي على الفحم
                  </span>
                  <span className="text-2xl font-black text-amber-300 font-mono drop-shadow">
                    {formatEGP(meal.basePrice)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {meal.name}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {meal.description}
                </p>

                <div className="space-y-2 mb-6 text-xs text-gray-300 bg-[#141822] p-3 rounded-xl border border-gray-800">
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

              <div className="flex items-center gap-3 pt-4 border-t border-gray-700/60">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onAddToCart(meal)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black py-3 px-4 rounded-xl text-sm transition-all shadow-md shadow-orange-500/25 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة للسلة</span>
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="p-3 bg-[#242b3a] hover:bg-[#2d3648] text-amber-300 border border-gray-700 rounded-xl transition-colors cursor-pointer"
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
