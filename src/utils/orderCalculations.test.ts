import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateItemPrice,
  calculateCartTotal,
  formatEGP,
  filterMenuItems,
  buildWhatsAppOrderMessage,
  MenuItem,
  CartItem,
} from './orderCalculations';

test('calculateItemPrice returns basePrice when no option selected', () => {
  const item: MenuItem = {
    id: 'foul-1',
    name: 'فول عادي',
    category: 'foul',
    basePrice: 7,
  };
  assert.equal(calculateItemPrice(item), 7);
});

test('calculateItemPrice returns option price when selected', () => {
  const item: MenuItem = {
    id: 'foul-1',
    name: 'فول عادي',
    category: 'foul',
    basePrice: 7,
    options: [
      { label: 'شامي', price: 7 },
      { label: 'فرنساوي', price: 15 },
    ],
  };
  assert.equal(calculateItemPrice(item, { label: 'فرنساوي', price: 15 }), 15);
});

test('calculateCartTotal sums multiple items with quantities correctly', () => {
  const item1: MenuItem = { id: '1', name: 'كفتة مشوية', category: 'meals', basePrice: 130 };
  const item2: MenuItem = { id: '2', name: 'طعمية كيري', category: 'taameya', basePrice: 25 };

  const cart: CartItem[] = [
    { cartItemId: 'c1', item: item1, quantity: 2 },
    {
      cartItemId: 'c2',
      item: item2,
      selectedOption: { label: 'فرنساوي', price: 30 },
      quantity: 3,
    },
  ];

  // 130 * 2 = 260; 30 * 3 = 90; total = 350
  assert.equal(calculateCartTotal(cart), 350);
});

test('formatEGP formats whole and decimal numbers properly', () => {
  assert.equal(formatEGP(130), '130 ج.م');
  assert.equal(formatEGP(1.5), '1.5 ج.م');
});

test('filterMenuItems filters by category and search text', () => {
  const items: MenuItem[] = [
    { id: '1', name: 'كفتة مشوية', category: 'meals', basePrice: 130 },
    { id: '2', name: 'طعمية كيري', category: 'taameya', basePrice: 25 },
    { id: '3', name: 'فول اسبشيال', category: 'foul', basePrice: 9 },
  ];

  const meals = filterMenuItems(items, 'meals', '');
  assert.equal(meals.length, 1);
  assert.equal(meals[0].name, 'كفتة مشوية');

  const searchResults = filterMenuItems(items, 'all', 'طعمية');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, '2');
});

test('buildWhatsAppOrderMessage builds expected encoded string with customer name and total', () => {
  const item: MenuItem = { id: '1', name: 'نصف دجاج مشوي', category: 'meals', basePrice: 130 };
  const cart: CartItem[] = [
    { cartItemId: 'c1', item, quantity: 1, notes: 'بدون شطة' },
  ];

  const encoded = buildWhatsAppOrderMessage(cart, {
    name: 'أحمد',
    phone: '01012345678',
    address: 'السويس، شارع الجيش',
  });

  const decoded = decodeURIComponent(encoded);
  assert.ok(decoded.includes('نصف دجاج مشوي'));
  assert.ok(decoded.includes('130 ج.م'));
  assert.ok(decoded.includes('أحمد'));
  assert.ok(decoded.includes('01012345678'));
  assert.ok(decoded.includes('بدون شطة'));
});

test('MENU_PDF_PAGES contains all 17 menu pages', async () => {
  const { MENU_PDF_PAGES } = await import('./pdfGenerator');
  assert.equal(MENU_PDF_PAGES.length, 17);
  assert.ok(MENU_PDF_PAGES.every((p) => p.title && p.image.startsWith('/assets/')));
});

