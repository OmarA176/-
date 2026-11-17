import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, ExternalLink, ThumbsUp, ShieldCheck, MessageSquare, Quote } from 'lucide-react';
import { GOOGLE_REVIEWS, GOOGLE_REVIEWS_STATS, GoogleReview } from '../data/reviewsData';

export const GoogleReviews: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'delivery' | 'food'>('all');

  const filteredReviews = GOOGLE_REVIEWS.filter((rev) => {
    if (activeFilter === 'delivery') {
      return rev.text.includes('دليفري') || rev.text.includes('توصيل') || rev.text.includes('سريع');
    }
    if (activeFilter === 'food') {
      return rev.text.includes('طعم') || rev.text.includes('مشويات') || rev.text.includes('كيري');
    }
    return true;
  });

  return (
    <section id="reviews" className="py-20 bg-[#121622] border-t border-[#caa85d]/20 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#caa85d]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#caa85d]/15 border border-[#caa85d]/30 text-[#dfc57d] text-xs font-bold mb-3 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#caa85d] text-[#caa85d]" />
            <span>آراء وتجارب العملاء الموثقة</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            ماذا يقول عملاؤنا على <span className="text-[#dfc57d]">خرائط Google</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            شهادات حقيقية من أهل السويس وزوارنا الكرام، نسعد دائماً بثقتكم ونسعى لتقديم أعلى مستوى من الجودة والخدمة.
          </p>
        </motion.div>

        {/* Google Maps Aggregate Rating Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#181d2a] border border-[#caa85d]/30 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl shadow-black/40 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Rating Summary */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
            <div className="flex flex-col items-center justify-center bg-[#11151f] border border-gray-800 rounded-2xl p-4 w-32 h-32 shrink-0 shadow-inner">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono leading-none">
                {GOOGLE_REVIEWS_STATS.averageRating}
              </span>
              <div className="flex items-center gap-1 my-1.5 text-[#caa85d]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < 4 ? 'fill-[#caa85d] text-[#caa85d]' : 'fill-[#caa85d]/40 text-[#caa85d]/40'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-gray-400 font-medium">من 5 نجوم</span>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                {/* Google Icon SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-white">تقييمات Google الرسمية</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-2">
                أكثر من <strong className="font-bold text-[#dfc57d]">440 تقييم معتمد</strong> لفرع مطعم وكافيه العالمية ٢ (شارع عثمان بن عفان، فيصل، السويس).
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  تقييمات موثقة من زوار حقيقيين
                </span>
                <span>•</span>
                <span>مفتوح 24 ساعة يومياً</span>
              </div>
            </div>
          </div>

          {/* Action to open on Google Maps */}
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={GOOGLE_REVIEWS_STATS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#caa85d] via-[#bfa054] to-[#a8863b] hover:from-[#d5b368] hover:via-[#caa85d] hover:to-[#b39146] text-[#12151d] font-black px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-black/30 transition-all shrink-0 cursor-pointer"
          >
            <span>اكتب تقييمك أو اقرأ المزيد على خرائط Google</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#caa85d] text-[#12151d] font-black shadow-md'
                : 'bg-[#1b202c] text-gray-300 hover:text-white hover:bg-[#222938] border border-gray-700/60'
            }`}
          >
            جميع التقيمات المختارة ({GOOGLE_REVIEWS.length})
          </button>
          <button
            onClick={() => setActiveFilter('delivery')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'delivery'
                ? 'bg-[#caa85d] text-[#12151d] font-black shadow-md'
                : 'bg-[#1b202c] text-gray-300 hover:text-white hover:bg-[#222938] border border-gray-700/60'
            }`}
          >
            سرعة التوصيل والدليفري
          </button>
          <button
            onClick={() => setActiveFilter('food')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'food'
                ? 'bg-[#caa85d] text-[#12151d] font-black shadow-md'
                : 'bg-[#1b202c] text-gray-300 hover:text-white hover:bg-[#222938] border border-gray-700/60'
            }`}
          >
            جودة الأكل والمشويات والرولات
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#1b202c] rounded-2xl border border-gray-700/80 p-6 flex flex-col justify-between shadow-lg shadow-black/20 hover:border-[#caa85d]/40 transition-colors group relative"
            >
              {/* Quote Watermark Icon */}
              <Quote className="absolute top-5 left-5 w-8 h-8 text-gray-700/30 group-hover:text-[#caa85d]/15 transition-colors pointer-events-none" />

              <div>
                {/* Author Info Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#caa85d] to-[#edd69b] text-[#12151d] font-black flex items-center justify-center text-base shadow-md shrink-0">
                    {review.authorName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white leading-snug">
                      {review.authorName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      {review.isLocalGuide && (
                        <span className="text-[#dfc57d] font-medium flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-[#dfc57d]" />
                          Local Guide
                        </span>
                      )}
                      <span>•</span>
                      <span>{review.relativeTime}</span>
                    </div>
                  </div>
                </div>

                {/* Stars Row */}
                <div className="flex items-center gap-1 mb-3 text-[#caa85d]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#caa85d]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-200 leading-relaxed mb-4 font-normal">
                  "{review.text}"
                </p>
              </div>

              {/* Bottom Tag / Highlighted Dish */}
              <div className="pt-3 border-t border-gray-700/60 flex items-center justify-between text-xs text-gray-400">
                {review.highlightDish && (
                  <span className="inline-flex items-center gap-1 bg-[#caa85d]/10 text-[#dfc57d] border border-[#caa85d]/20 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                    <MessageSquare className="w-3 h-3 text-[#caa85d]" />
                    <span>{review.highlightDish}</span>
                  </span>
                )}
                <span className="flex items-center gap-1 text-gray-400">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{review.likesCount}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
