import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Flame, Heart, Sparkles, Coffee, Award, Truck } from 'lucide-react';

export const AboutAndFeatures: React.FC = () => {
  const features = [
    {
      icon: Flame,
      title: 'مشويات على الفحم بتتبيلة سرية',
      description: 'نستخدم أجود اللحوم والدواجن الطازجة يومياً مع خلطات تتبيل مميزة تُشوى باحتراف على الفحم الطبيعي.',
    },
    {
      icon: Sparkles,
      title: 'خلطات وسندوتشات رول حصرية',
      description: 'ابتكارات خاصة بمطعم العالمية مثل رولات الطعمية بالكيري، تشيز كيف، وديناميت الطعمية والحلو.',
    },
    {
      icon: Truck,
      title: 'توصيل فوري وسريع بالسويس',
      description: 'أسطول دليفري مجهز لتوصيل وجباتكم ساخنة وطازجة في أسرع وقت لجميع أنحاء ومناطق محافظة السويس.',
    },
    {
      icon: Coffee,
      title: 'كافيه متكامل ومشروبات فاخرة',
      description: 'جلسات راقية ومشروبات ساخنة وعصائر طازجة للاستمتاع بأجمل الأوقات مع العائلة والأصدقاء.',
    },
    {
      icon: ShieldCheck,
      title: 'أعلى معايير النظافة والجودة',
      description: 'اهتمام فائق بنظافة المطبخ وجودة الزيوت والمكونات لتقديم طعام صحي، شهي وآمن لجميع أفراد الأسرة.',
    },
    {
      icon: Award,
      title: 'أسعار مناسبة وأعلى قيمة',
      description: 'قائمة طعام شاملة تناسب جميع الأذواق والميزانيات مع عروض مستمرة على الوجبات العائلية والفردية.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#12151f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold mb-4">
              <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
              <span>قصة العالمية في السويس</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              نصنع لكم المذاق المصري الأصيل{' '}
              <span className="text-gold-gradient block mt-1">بلمسة عصرية مبتكرة</span>
            </h2>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4">
              انطلق مطعم وكافيه العالمية برؤية واضحة: الارتقاء بالسندوتشات المصرية والوجبات الشعبية والغربية إلى أعلى درجات الجودة والفخامة، مع الحفاظ على الروح الشعبية والأسعار العادلة.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              من حبة الفول المنتقاة بعناية، وقرص الطعمية المقرمش بالسمسم، وحتى أسياخ الكفتة والشيش طاووق المشوية على الفحم الحي؛ نحرص على تقديم تجربة طعام استثنائية تسعد كل عميل يزورنا أو يطلب من عندنا.
            </p>

            <div className="flex items-center gap-6 p-4 rounded-xl bg-[#1b202c] border border-gray-700/80 shadow-md">
              <div className="text-center">
                <span className="text-2xl font-black text-amber-300 font-mono block">24/7</span>
                <span className="text-xs text-gray-300">خدمة مستمرة</span>
              </div>
              <div className="h-8 w-px bg-gray-600" />
              <div className="text-center">
                <span className="text-2xl font-black text-amber-300 font-mono block">+50</span>
                <span className="text-xs text-gray-300">صنف وساندوتش</span>
              </div>
              <div className="h-8 w-px bg-gray-600" />
              <div className="text-center">
                <span className="text-2xl font-black text-amber-300 font-mono block">100%</span>
                <span className="text-xs text-gray-300">مكونات طازجة</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-amber-400/40 shadow-2xl group">
              <img
                src="/assets/aistudio/480494690_1164120609058358_2999720792961422636_n_e7f92920.jpg"
                alt="مطعم وكافيه العالمية بالسويس"
                className="w-full h-84 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                <span className="text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                  السويس - مصر
                </span>
                <h4 className="text-2xl font-bold text-white">
                  مطعم وكافيه العالمية ٢
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  مكانكم المفضل للقاء الأحبة وتناول أشهى الوجبات والمشروبات
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards with hover animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                whileHover={{ y: -4, borderColor: 'rgba(251, 191, 36, 0.4)' }}
                className="bg-[#1b202c] rounded-2xl border border-gray-700/80 p-6 transition-colors shadow-lg shadow-black/20"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
