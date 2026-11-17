import test from 'node:test';
import assert from 'node:assert/strict';
import { isInteractiveTarget, CLICKABLE_CURSOR_SELECTOR } from './customCursor';

test('CLICKABLE_CURSOR_SELECTOR covers links, enabled buttons, and cursor-pointer', () => {
  assert.match(CLICKABLE_CURSOR_SELECTOR, /a\[href\]/);
  assert.match(CLICKABLE_CURSOR_SELECTOR, /button:not\(:disabled\)/);
  assert.match(CLICKABLE_CURSOR_SELECTOR, /\.cursor-pointer/);
});

test('isInteractiveTarget returns false for null, primitive, or iframe elements', () => {
  assert.equal(isInteractiveTarget(null), false);
  assert.equal(isInteractiveTarget('div'), false);
  assert.equal(
    isInteractiveTarget({
      tagName: 'IFRAME',
      closest: () => null,
    }),
    false
  );
});

test('isInteractiveTarget returns true when closest matches an active clickable element', () => {
  const mockTarget = {
    tagName: 'SPAN',
    closest: (selector: string) => {
      assert.equal(selector, CLICKABLE_CURSOR_SELECTOR);
      return {
        tagName: 'BUTTON',
        hasAttribute: () => false,
        getAttribute: () => null,
      };
    },
  };
  assert.equal(isInteractiveTarget(mockTarget), true);
});

test('isInteractiveTarget returns false for disabled or aria-disabled elements', () => {
  const disabledTarget = {
    tagName: 'BUTTON',
    closest: () => ({
      tagName: 'BUTTON',
      hasAttribute: (attr: string) => attr === 'disabled',
      getAttribute: () => null,
    }),
  };
  assert.equal(isInteractiveTarget(disabledTarget), false);

  const ariaDisabledTarget = {
    tagName: 'DIV',
    closest: () => ({
      tagName: 'DIV',
      hasAttribute: () => false,
      getAttribute: (attr: string) => (attr === 'aria-disabled' ? 'true' : null),
    }),
  };
  assert.equal(isInteractiveTarget(ariaDisabledTarget), false);
});
