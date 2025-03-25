export interface Config {
  sheetName: string;
  dateRowIndex: number;
  firstDateColumnIndex: number;
  fristPlayerRowIndex: number;
  startTime: Record<string, string>;
  duration: number;
}

export const H50: Config = {
  sheetName: "H50",
  dateRowIndex: 1,
  firstDateColumnIndex: 2,
  fristPlayerRowIndex: 2,
  startTime: {
    1: "20:00", // Montag
    4: "19:30", // Donnerstag
  },
  duration: 90,
};

export const PROVI: Config = {
  sheetName: "Spielplan",
  dateRowIndex: 4,
  firstDateColumnIndex: 2,
  fristPlayerRowIndex: 5,
  startTime: {
    2: "18:00", // Dienstag
  },
  duration: 90,
};
