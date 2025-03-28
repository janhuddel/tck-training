import { parseExcelFile } from '@tck-training/excel-parser';
import { beforeEach, describe, it, vi } from 'vitest';
import { print } from '../src/actions/print';
import { trainingCalendarMock } from './__fixtures__/training-calendar';

// only mock the parseExcelFile function
vi.mock(import('@tck-training/excel-parser'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    parseExcelFile: vi.fn(),
  };
});

describe('CLI Actions', () => {
  describe('print action', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      (parseExcelFile as any).mockResolvedValue(trainingCalendarMock);
    });

    it('should print all training calendar data if no player is provided', async () => {
      await print('test.xlsx', { config: 'H50' });

      // TODO: add assertions
    });

    it('should print training calendar data for a specific player if provided', async () => {
      await print('test.xlsx', { config: 'H50', player: 'Player 1' });

      // TODO: add assertions
    });
  });
});
