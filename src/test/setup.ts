import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cada teste começa do zero: DOM, storage, tema e URL
afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  window.history.replaceState(null, '', '/');
});

// ── APIs de navegador que o jsdom não implementa ──

window.matchMedia = ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
})) as typeof window.matchMedia;

class MockIntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

Element.prototype.scrollIntoView = vi.fn();
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
