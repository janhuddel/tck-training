import { print } from "../src/actions/print";
import { trainingCalendarMock } from "./__fixtures__/training-calendar";

// override the parseExcelFile function to return a mock
jest.mock("@tck-training/excel-parser", () => ({
  ...jest.requireActual("@tck-training/excel-parser"),
  parseExcelFile: jest.fn((...args: unknown[]) => {
    return Promise.resolve(trainingCalendarMock);
  }),
}));

describe("CLI Actions", () => {
  describe("print action", () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      jest.clearAllMocks();
      consoleSpy = jest.spyOn(console, "log").mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    const getConsoleOutput = (): string[] =>
      consoleSpy.mock.calls.flatMap((call) => call[0].split("\n"));

    const verifyHeaderRow = (outputLines: string[]) => {
      const headerRow = outputLines[1];
      expect(headerRow).toContain("Date");
      expect(headerRow).toContain("Time");
      expect(headerRow).toContain("Players");
    };

    it("should print all training calendar data if no player is provided", async () => {
      await print("test.xlsx", { config: "H50" });

      const consoleOutput = getConsoleOutput();
      expect(consoleOutput.length).toBe(6);

      verifyHeaderRow(consoleOutput);

      const firstDataRow = consoleOutput[3];
      expect(firstDataRow).toContain("Sep 09, 2024");
      expect(firstDataRow).toContain("20:00");
      expect(firstDataRow).toContain("Player 1, Player 2, Player 3, Player 10");
    });

    it("should print training calendar data for a specific player if provided", async () => {
      await print("test.xlsx", { config: "H50", player: "Player 1" });

      const consoleOutput = getConsoleOutput();
      expect(consoleOutput.length).toBe(5);

      verifyHeaderRow(consoleOutput);

      const firstDataRow = consoleOutput[3];
      expect(firstDataRow).toContain("Sep 09, 2024");
      expect(firstDataRow).toContain("20:00");
      expect(firstDataRow).toContain("Player 1");
    });
  });
});
