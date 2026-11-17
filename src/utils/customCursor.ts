export const CLICKABLE_CURSOR_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  '[role="button"]:not([aria-disabled="true"])',
  'summary',
  'select:not(:disabled)',
  'label[for]',
  'input[type="button"]:not(:disabled)',
  'input[type="submit"]:not(:disabled)',
  'input[type="checkbox"]:not(:disabled)',
  'input[type="radio"]:not(:disabled)',
  '.cursor-pointer',
].join(', ');

export interface CursorTargetElement {
  tagName?: string;
  closest?: (selector: string) => CursorTargetElement | null;
  hasAttribute?: (name: string) => boolean;
  getAttribute?: (name: string) => string | null;
}

export function isInteractiveTarget(target: unknown): boolean {
  if (!target || typeof target !== 'object') {
    return false;
  }

  const el = target as CursorTargetElement;
  if (typeof el.closest !== 'function') {
    return false;
  }

  if (el.tagName?.toUpperCase() === 'IFRAME') {
    return false;
  }

  const matched = el.closest(CLICKABLE_CURSOR_SELECTOR);
  if (!matched) {
    return false;
  }

  if (
    matched.hasAttribute?.('disabled') ||
    matched.getAttribute?.('aria-disabled') === 'true'
  ) {
    return false;
  }

  return true;
}
