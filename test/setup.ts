/// <reference types="jest" />

import '@testing-library/jest-dom';

// Suppress React Router future flag warnings in test output
const originalWarn = console.warn;

global.console.warn = (...args: unknown[]) => {
  const message = args[0];
  
  // Filter out React Router v7 migration warnings
  if (
    typeof message === 'string' && 
    (message.includes('React Router Future Flag') ||
     message.includes('v7_startTransition') ||
     message.includes('v7_relativeSplatPath'))
  ) {
    return;
  }
  
  originalWarn.call(console, ...args);
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
  takeRecords = jest.fn(() => []);
}

(window as unknown as { IntersectionObserver: typeof MockIntersectionObserver }).IntersectionObserver = MockIntersectionObserver;
