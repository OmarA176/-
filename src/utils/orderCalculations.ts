export interface PriceOption {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  basePrice: number;
  options?: PriceOption[];
  isNew?: boolean;
  isSpecial?: boolean;
  description?: string;
  menuImage?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedOption?: PriceOption;
  quantity: number;
  notes?: string;
}

/**
 * Resolves the unit price for a menu item given an optional selected option.
 */
export function calculateItemPrice(item: MenuItem, selectedOption?: PriceOption): number {
  if (selectedOption && typeof selectedOption.price === 'number') {
    return selectedOption.price;
  }
  return item.basePrice;
}

/**
 * Calculates total price of cart items.
 */
export function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, cartItem) => {
    const unitPrice = calculateItemPrice(cartItem.item, cartItem.selectedOption);
    return total + unitPrice * cartItem.quantity;
  }, 0);
}

/**
 * Formats a number in Egyptian Pounds (EGP).
 */
export function formatEGP(amount: number): string {
  return `${amount.toFixed(amount % 1 === 0 ? 0 : 1)} ج.م`;
}

/**
 * Filters menu items by search query and category.
 */
export function filterMenuItems(
  items: MenuItem[],
  selectedCategory: string,
  searchQuery: string
): MenuItem[] {
  const query = searchQuery.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.nameEn && item.nameEn.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });
}

/**
 * Constructs a clean WhatsApp order message in Arabic with itemized breakdown.
 */
export function buildWhatsAppOrderMessage(
  cart: CartItem[],
  customerInfo?: { name?: string; address?: string; phone?: string; notes?: string }
): string {
  if (cart.length === 0) return '';

  const total = calculateCartTotal(cart);
  let message = `*طلب جديد من موقع مطعم وكافيه العالمية* 🍽️\n\n`;

  if (customerInfo?.name) {
    message += `👤 *الاسم:* ${customerInfo.name}\n`;
  }
  if (customerInfo?.phone) {
    message += `📱 *رقم الهاتف:* ${customerInfo.phone}\n`;
  }
  if (customerInfo?.address) {
    message += `📍 *العنوان:* ${customerInfo.address}\n`;
  }
  if (customerInfo?.notes) {
    message += `📝 *ملاحظات خاصة:* ${customerInfo.notes}\n`;
  }

  message += `\n*تفاصيل الطلب:*\n`;
  cart.forEach((cartItem, idx) => {
    const unitPrice = calculateItemPrice(cartItem.item, cartItem.selectedOption);
    const subtotal = unitPrice * cartItem.quantity;
    const optionText = cartItem.selectedOption ? ` (${cartItem.selectedOption.label})` : '';
    const notesText = cartItem.notes ? ` - ملاحظة: ${cartItem.notes}` : '';
    message += `${idx + 1}. ${cartItem.item.name}${optionText} × ${cartItem.quantity} = ${subtotal} ج.م${notesText}\n`;
  });

  message += `\n*الإجمالي:* ${total} ج.م\n`;
  message += `\nشكراً لكم! برجاء تأكيد الطلب ووقت التوصيل.`;

  return encodeURIComponent(message);
}
