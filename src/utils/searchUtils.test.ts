import { test, describe } from 'node:test';
import assert from 'node:assert';
import { normalizeArabic, matchItemWithFuzzy } from './searchUtils';

describe('searchUtils - Arabic normalization', () => {
  test('normalizes teh marbuta and heh', () => {
    assert.strictEqual(normalizeArabic('طعمية'), 'طعميه');
    assert.strictEqual(normalizeArabic('طعميه'), 'طعميه');
  });

  test('normalizes alef variants', () => {
    assert.strictEqual(normalizeArabic('أومليت'), 'اومليت');
    assert.strictEqual(normalizeArabic('إسكندراني'), 'اسكندراني');
    assert.strictEqual(normalizeArabic('آخر'), 'اخر');
  });

  test('removes tashkeel', () => {
    assert.strictEqual(normalizeArabic('فُولٌ'), 'فول');
    assert.strictEqual(normalizeArabic('طَعْمِيَّة'), 'طعميه');
  });

  test('normalizes alef maksura and yeh', () => {
    assert.strictEqual(normalizeArabic('حواوشى'), 'حواوشي');
  });
});

describe('searchUtils - matchItemWithFuzzy', () => {
  const sampleItem = {
    name: 'ساندوتش طعمية كيري',
    nameEn: 'Falafel with Kiri Cheese',
    description: 'طعمية مقرمشة سخنة مع جبنة كيري فرنسية غنية',
    category: 'taameya',
  };

  test('matches with teh marbuta vs heh query', () => {
    assert.strictEqual(matchItemWithFuzzy('طعميه', sampleItem), true);
    assert.strictEqual(matchItemWithFuzzy('طعمية', sampleItem), true);
  });

  test('matches with hamza differences', () => {
    const eggItem = {
      name: 'ساندوتش بيض أومليت',
      nameEn: 'Omelette Egg Sandwich',
      description: 'بيض بلدي أومليت',
      category: 'eggs',
    };
    assert.strictEqual(matchItemWithFuzzy('اومليت', eggItem), true);
    assert.strictEqual(matchItemWithFuzzy('أومليت', eggItem), true);
  });

  test('tolerates small typo in query', () => {
    // "طعمييه" or "طعيمة" for "طعمية"
    assert.strictEqual(matchItemWithFuzzy('طعيمة', sampleItem), true);
  });

  test('matches English name', () => {
    assert.strictEqual(matchItemWithFuzzy('kiri', sampleItem), true);
    assert.strictEqual(matchItemWithFuzzy('falafel', sampleItem), true);
  });
});
