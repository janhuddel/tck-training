import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@tck-training/excel-parser': resolve(__dirname, '../excel-parser/src/index.ts'),
    },
  },
});
