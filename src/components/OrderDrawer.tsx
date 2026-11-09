import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, MessageCircle, Phone, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { CartItem, calculateCartTotal, calculateItemPrice, formatEGP, buildWhatsAppOrderMessage } from '../utils/orderCalculations';

interface OrderDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const total = calculateCartTotal(cart);

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;
    const encoded = buildWhatsAppOrderMessage(cart, {
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      notes: orderNotes,
    });
    const url = `https://wa.me/201101760700?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-start"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '-100%', opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="w-full max-w-md bg-[#161a25] h-full flex flex-col border-l border-amber-500/30 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-750 bg-[#1a202e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400/20 text-amber-300 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">سلة الطلب السريع</h3>
              <p className="text-xs text-amber-300/80 font-medium">
                {cart.length === 0 ? 'السلة فارغة' : `${cart.length} صنف مضاف`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-850 transition-colors cursor-pointer"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body / Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-200 font-bold mb-1">سلتك فارغة حالياً</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto mb-6">
                تصفح قائمة الطعام وأضف الأصناف المفضلة لديك لتجهيز طلبك فوراً.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black rounded-xl text-sm transition-transform hover:scale-105 cursor-pointer"
              >
                تصفح القائمة الآن
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                <AnimatePresence>
                  {cart.map((cartItem) => {
                    const unitPrice = calculateItemPrice(cartItem.item, cartItem.selectedOption);
                    const subtotal = unitPrice * cartItem.quantity;

                    return (
                      <motion.div
                        key={cartItem.cartItemId}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-[#1f2535] rounded-xl p-3.5 border border-gray-700/80 flex flex-col gap-2 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-white">{cartItem.item.name}</h4>
                            {cartItem.selectedOption && (
                              <span className="text-xs text-amber-300 font-semibold">
                                نوع العيش/الحجم: {cartItem.selectedOption.label}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => onRemoveItem(cartItem.cartItemId)}
                            className="text-gray-400 hover:text-red-400 p-1 transition-colors cursor-pointer"
                            title="حذف الصنف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-700/60">
                          {/* Quantity Stepper */}
                          <div className="flex items-center gap-2 bg-[#161a25] px-2.5 py-1 rounded-lg border border-gray-700">
                            <button
                              onClick={() =>
                                onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)
                              }
                              className="p-1 text-gray-300 hover:text-white cursor-pointer"
                              aria-label="تقليل الكمية"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-black text-white px-1">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)
                              }
                              className="p-1 text-gray-300 hover:text-white cursor-pointer"
                              aria-label="زيادة الكمية"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-sm font-black text-amber-300 font-mono">
                            {formatEGP(subtotal)}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Clear Cart Button */}
              <div className="flex justify-end">
                <button
                  onClick={onClearCart}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  إفراغ السلة بالكامل
                </button>
              </div>

              {/* Delivery Details Form */}
              <div className="pt-4 border-t border-gray-700/70 space-y-3">
                <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                  بيانات التوصيل (اختياري للطلب السريع):
                </h4>
                <div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="الاسم الكريم"
                    className="w-full bg-[#1b202c] border border-gray-700 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="رقم الهاتف للتواصل"
                    className="w-full bg-[#1b202c] border border-gray-700 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="العنوان بالتفصيل داخل السويس"
                    className="w-full bg-[#1b202c] border border-gray-700 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="ملاحظات على الوجبات (مثال: بدون شطة، زيادة طحينة...)"
                    className="w-full bg-[#1b202c] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer & Checkout Actions */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-700/70 bg-[#191e2b] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-200">إجمالي الحساب:</span>
              <span className="text-2xl font-black text-amber-300 font-mono drop-shadow">
                {formatEGP(total)}
              </span>
            </div>

            {/* Direct WhatsApp Action (Brightened) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSendWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال الطلب عبر واتساب ({RESTAURANT_INFO.displayPhone})</span>
            </motion.button>

            {/* Direct Phone Call Action (Brightened) */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black py-3 px-4 rounded-xl text-sm transition-all shadow-md shadow-orange-500/20 cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>اتصال هاتفي مباشر للتأكيد</span>
            </motion.a>
          </div>
        )}
      </motion.div>
    </div>
  );
};
