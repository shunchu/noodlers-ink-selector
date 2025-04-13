import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/vue';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with Testing Library matchers
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
