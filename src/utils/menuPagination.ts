import { CategoryInfo } from '../data/restaurantData';
import { MenuItem } from './orderCalculations';

export interface GroupedCategorySection {
  category: CategoryInfo;
  items: MenuItem[];
}

export interface PaginatedCategorySection {
  category: CategoryInfo;
  items: MenuItem[];
  totalInCategory: number;
}

export interface PaginatedMenuResult {
  visibleGroups: PaginatedCategorySection[];
  shownCount: number;
  totalCount: number;
  hasMore: boolean;
  remainingCount: number;
}

export const INITIAL_ALL_MENU_LIMIT = 12;
export const ALL_MENU_LOAD_STEP = 16;

/**
 * Slices grouped category sections so at most `limit` items are shown across categories
 * while preserving category headers and item order.
 */
export function paginateGroupedMenu(
  groups: GroupedCategorySection[],
  limit: number
): PaginatedMenuResult {
  const safeLimit = Math.max(0, Math.floor(limit));
  const totalCount = groups.reduce((sum, g) => sum + g.items.length, 0);

  const visibleGroups: PaginatedCategorySection[] = [];
  let shownCount = 0;

  for (const group of groups) {
    if (shownCount >= safeLimit) break;
    const remainingBudget = safeLimit - shownCount;
    const slicedItems = group.items.slice(0, remainingBudget);

    if (slicedItems.length > 0) {
      visibleGroups.push({
        category: group.category,
        items: slicedItems,
        totalInCategory: group.items.length,
      });
      shownCount += slicedItems.length;
    }
  }

  const remainingCount = Math.max(0, totalCount - shownCount);

  return {
    visibleGroups,
    shownCount,
    totalCount,
    hasMore: remainingCount > 0,
    remainingCount,
  };
}
