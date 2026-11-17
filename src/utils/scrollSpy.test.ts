import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getActiveNavSection } from './scrollSpy.ts';

describe('scrollSpy getActiveNavSection', () => {
  const sampleSections = [
    { navId: 'home', top: 0 },
    { navId: 'meals', top: 900 },
    { navId: 'menu', top: 1700 },
    { navId: 'about', top: 3200 },
    { navId: 'reviews', top: 4100 },
    { navId: 'contact', top: 4900 },
  ];

  it('returns home when near the very top of the page', () => {
    const active = getActiveNavSection(sampleSections, 20, 900, 5600);
    assert.equal(active, 'home');
  });

  it('highlights meals when scrolled into meals section', () => {
    const scrolled = sampleSections.map((s) => ({ ...s, top: s.top - 850 }));
    const active = getActiveNavSection(scrolled, 850, 900, 5600);
    assert.equal(active, 'meals');
  });

  it('highlights menu when scrolled deep inside menu section', () => {
    const scrolled = sampleSections.map((s) => ({ ...s, top: s.top - 2100 }));
    const active = getActiveNavSection(scrolled, 2100, 900, 5600);
    assert.equal(active, 'menu');
  });

  it('highlights the last section (contact) when scrolled to the bottom of the page', () => {
    const scrolled = sampleSections.map((s) => ({ ...s, top: s.top - 4700 }));
    const active = getActiveNavSection(scrolled, 4700, 900, 5600);
    assert.equal(active, 'contact');
  });
});
