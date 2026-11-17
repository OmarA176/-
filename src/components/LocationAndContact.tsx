import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Navigation } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationAndContact: React.FC = () => {
  return (
    <section id="location" className="py-14 lg:py-16 bg-[#121724] border-t border-[#caa85d]/20 relative overflow-hidden">
      {/* Subtle Ambient Glows for Frosted Glass Depth */}
      <div className="absolute -top-24 left-1/3 w-96 h-96 bg-[#caa85d]/14 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#caa85d]/15 border border-[#caa85d]/30 text-[#dfc57d] text-xs font-bold mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-[#caa85d]" />
            <span>موقعنا وخدمة العملاء</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            تفضلوا بزيارتنا أو <span className="text-[#dfc57d]">اطلبوا الآن</span>
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            يسعدنا استقبالكم في فرعنا بالسويس، أو توصيل طلباتكم ساخنة إلى باب منزلكم بأسرع وقت.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Direct Call Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -3 }}
              className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/15 hover:border-[#caa85d]/45 p-5 transition-colors shadow-[0_12px_32px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] transform-gpu"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-[#caa85d]/15 border border-[#caa85d]/30 text-[#dfc57d] shrink-0">
                  <Phone className="w-5 h-5 fill-current text-[#caa85d] animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white mb-1">خط الطلبات السريعة والتوصيل</h3>
                  <p className="text-xs sm:text-sm text-gray-300 mb-2.5">
                    اتصل بنا مباشرة لتأكيد طلبك أو الاستفسار عن الأصناف والعروض.
                  </p>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="inline-flex items-center gap-2 text-lg sm:text-xl font-black text-[#dfc57d] hover:text-[#f3e7cb] font-mono tracking-wide"
                  >
                    <span>{RESTAURANT_INFO.displayPhone}</span>
                    <span className="text-xs text-gray-400 font-sans">({RESTAURANT_INFO.phone})</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/15 hover:border-emerald-400/45 p-5 transition-colors shadow-[0_12px_32px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] transform-gpu"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white mb-1">الطلب عبر واتساب</h3>
                  <p className="text-xs sm:text-sm text-gray-300 mb-3">
                    أرسل لنا قائمة طلباتك وعنوانك وسيقوم فريق الدليفري بالتنفيذ فوراً.
                  </p>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={RESTAURANT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-colors"
                  >
                    <span>مراسلة واتساب فوراً</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Working Hours Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              whileHover={{ y: -3 }}
              className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/15 hover:border-blue-400/45 p-5 transition-colors shadow-[0_12px_32px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] transform-gpu"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">أوقات العمل والتوصيل</h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    مفتوح على مدار الساعة 24/7 طوال أيام الأسبوع.
                    <br />
                    صالة الاستقبال وخدمة الدليفري متاحة ليلاً ونهاراً.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map Preview & Location Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/15 p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_36px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] transform-gpu"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <span>موقع مطعم العالمية ٢ على الخريطة</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                    السويس، جمهورية مصر العربية
                  </p>
                </div>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={RESTAURANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-colors shadow-md whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>فتح في Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>

              {/* Responsive Map Embed Container */}
              <div className="relative w-full h-68 sm:h-76 rounded-xl overflow-hidden border border-gray-700 bg-gray-900 shadow-inner">
                <iframe
                  title="موقع مطعم العالمية ٢ على خرائط جوجل"
                  src="https://maps.google.com/maps?q=29.9949657,32.4952649&hl=ar&z=17&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="pt-3.5 mt-3.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-300">
              <span>الإحداثيات: 29.9949° N, 32.4952° E</span>
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 hover:underline flex items-center gap-1 font-bold"
              >
                <span>احصل على اتجاهات القيادة مباشرة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
