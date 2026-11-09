import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Navigation } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationAndContact: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-[#141822] border-t border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>موقعنا وخدمة العملاء</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            تفضلوا بزيارتنا أو <span className="text-gold-gradient">اطلبوا الآن</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            يسعدنا استقبالكم في فرعنا بالسويس، أو توصيل طلباتكم ساخنة إلى باب منزلكم بأسرع وقت.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Direct Call Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3, borderColor: 'rgba(251, 191, 36, 0.4)' }}
              className="bg-[#1b202c] rounded-2xl border border-gray-700/80 p-6 transition-all shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-300 shrink-0">
                  <Phone className="w-6 h-6 fill-current animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white mb-1">خط الطلبات السريعة والتوصيل</h3>
                  <p className="text-xs text-gray-300 mb-3">
                    اتصل بنا مباشرة لتأكيد طلبك أو الاستفسار عن الأصناف والعروض.
                  </p>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="inline-flex items-center gap-2 text-xl font-black text-amber-300 hover:text-amber-200 font-mono tracking-wide"
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
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -3, borderColor: 'rgba(16, 185, 129, 0.4)' }}
              className="bg-[#1b202c] rounded-2xl border border-gray-700/80 p-6 transition-all shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white mb-1">الطلب عبر واتساب</h3>
                  <p className="text-xs text-gray-300 mb-3">
                    أرسل لنا قائمة طلباتك وعنوانك وسيقوم فريق الدليفري بالتنفيذ فوراً.
                  </p>
                  <a
                    href={RESTAURANT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs rounded-xl shadow-md shadow-emerald-950/30 transition-colors"
                  >
                    <span>مراسلة واتساب فوراً</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Working Hours Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#1b202c] rounded-2xl border border-gray-700/80 p-6 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">أوقات العمل والتوصيل</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
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
            viewport={{ once: true }}
            className="lg:col-span-7 bg-[#1b202c] rounded-2xl border border-gray-700/80 p-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <span>موقع مطعم العالمية ٢ على الخريطة</span>
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    السويس، جمهورية مصر العربية
                  </p>
                </div>

                <a
                  href={RESTAURANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-md shadow-orange-500/25 whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>فتح في Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Responsive Map Embed Container */}
              <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-gray-700 bg-gray-900 shadow-inner">
                <iframe
                  title="موقع مطعم العالمية ٢ على خرائط جوجل"
                  src="https://maps.google.com/maps?q=29.9949657,32.4952649&hl=ar&z=17&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05]"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-300">
              <span>الإحداثيات: 29.9949° N, 32.4952° E</span>
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 hover:underline flex items-center gap-1 font-bold"
              >
                <span>احصل على اتجاهات القيادة مباشرة</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
