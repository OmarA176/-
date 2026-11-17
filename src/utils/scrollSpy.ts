export interface SectionPosition {
  navId: string;
  top: number;
}

/**
 * Determines which navigation item should be highlighted based on the current
 * viewport positions of page sections and scroll offsets.
 */
export function getActiveNavSection(
  sections: SectionPosition[],
  scrollY: number,
  viewportHeight: number,
  documentHeight: number,
  headerOffset: number = 140
): string {
  if (sections.length === 0) return 'home';

  if (scrollY < 80) {
    return sections[0].navId;
  }

  // If scrolled to the very bottom of the page, highlight the last section
  if (viewportHeight + scrollY >= documentHeight - 40) {
    return sections[sections.length - 1].navId;
  }

  // Pick the last section whose top edge has scrolled past the headerOffset line
  let current = sections[0].navId;
  for (const section of sections) {
    if (section.top <= headerOffset) {
      current = section.navId;
    }
  }

  return current;
}
