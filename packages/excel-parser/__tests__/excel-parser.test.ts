import path from 'path';
import { describe, expect, it } from 'vitest';

import { H50, PROVI } from '../src/parser/config';
import { parseExcelFile } from '../src/parser/excel-parser';

describe('ExcelParser', () => {
  it("training calendar for 'herren 50' should be parsed correctly", async () => {
    const testFilePath = path.join(__dirname, 'fixtures', 'herren-50.xlsx');

    const result = await parseExcelFile(testFilePath, H50);

    expect(result).toBeDefined();
    expect(result.events).toBeInstanceOf(Array);
    expect(result.events.length).toBe(62);

    const firstEvent = result.events[0];
    expect(firstEvent.date).toBeInstanceOf(Date);
    expect(firstEvent.players).toBeInstanceOf(Array);
    expect(firstEvent.players.length).toBe(4);
    expect(firstEvent.players).toContain('Player 1');
    expect(firstEvent.players).toContain('Player 2');
    expect(firstEvent.players).toContain('Player 3');
    expect(firstEvent.players).toContain('Player 10');
    expect(firstEvent.date).toEqual(new Date('2024-09-09 20:00:00'));
  });

  it("training calendar for 'provinzial' should be parsed correctly", async () => {
    const testFilePath = path.join(__dirname, 'fixtures', 'provinzial.xlsx');

    const result = await parseExcelFile(testFilePath, PROVI);

    expect(result).toBeDefined();
    expect(result.events).toBeInstanceOf(Array);
    expect(result.events.length).toBe(30);

    const firstEvent = result.events[0];
    expect(firstEvent.date).toBeInstanceOf(Date);
    expect(firstEvent.players).toBeInstanceOf(Array);
    expect(firstEvent.players.length).toBe(4);
    expect(firstEvent.players).toContain('Player 1');
    expect(firstEvent.players).toContain('Player 2');
    expect(firstEvent.players).toContain('Player 6');
    expect(firstEvent.players).toContain('Player 7');
    expect(firstEvent.date).toEqual(new Date('2024-09-17 18:00:00'));
  });

  it('should throw an error when file does not exist', async () => {
    const nonExistentFile = path.join(__dirname, 'fixtures', 'non-existent.xlsx');

    await expect(parseExcelFile(nonExistentFile, H50)).rejects.toThrow();
  });
});
