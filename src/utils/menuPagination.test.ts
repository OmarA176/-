import test from 'node:test';
import assert from 'node:assert/strict';
import { paginateGroupedMenu, GroupedCategorySection } from './menuPagination';
import { CategoryInfo } from '../data/restaurantData';
import { MenuItem } from './orderCalculations';

const makeCategory = (id: string, name: string): CategoryInfo => ({
  id,
  name,
  subtitle: '',
  iconName: 'Utensils',
  image: '',
});

const makeItem = (id: string, category: string): MenuItem => ({
  id,
  name: `صنف ${id}`,
  category,
  basePrice: 20,
});

const sampleGroups: GroupedCategorySection[] = [
  {
    category: makeCategory('meals', 'الوجبات'),
    items: [makeItem('m1', 'meals'), makeItem('m2', 'meals'), makeItem('m3', 'meals')],
  },
  {
    category: makeCategory('rolls', 'الرولات'),
    items: [
      makeItem('r1', 'rolls'),
      makeItem('r2', 'rolls'),
      makeItem('r3', 'rolls'),
      makeItem('r4', 'rolls'),
    ],
  },
  {
    category: makeCategory('foul', 'الفول'),
    items: [makeItem('f1', 'foul'), makeItem('f2', 'foul')],
  },
];

test('paginateGroupedMenu limits items across categories and preserves totalInCategory', () => {
  const res = paginateGroupedMenu(sampleGroups, 5);
  assert.equal(res.shownCount, 5);
  assert.equal(res.totalCount, 9);
  assert.equal(res.remainingCount, 4);
  assert.equal(res.hasMore, true);
  assert.equal(res.visibleGroups.length, 2);
  assert.equal(res.visibleGroups[0].items.length, 3);
  assert.equal(res.visibleGroups[0].totalInCategory, 3);
  assert.equal(res.visibleGroups[1].items.length, 2);
  assert.equal(res.visibleGroups[1].totalInCategory, 4);
});

test('paginateGroupedMenu handles limit greater than total items', () => {
  const res = paginateGroupedMenu(sampleGroups, 50);
  assert.equal(res.shownCount, 9);
  assert.equal(res.totalCount, 9);
  assert.equal(res.remainingCount, 0);
  assert.equal(res.hasMore, false);
  assert.equal(res.visibleGroups.length, 3);
});

test('paginateGroupedMenu handles zero limit cleanly', () => {
  const res = paginateGroupedMenu(sampleGroups, 0);
  assert.equal(res.shownCount, 0);
  assert.equal(res.remainingCount, 9);
  assert.equal(res.hasMore, true);
  assert.equal(res.visibleGroups.length, 0);
});
