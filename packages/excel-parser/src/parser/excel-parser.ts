import * as XLSX from "xlsx";
import { Config } from "./config";
import {
  extractDateFromCell,
  getPlayerName,
  isBrowser,
  isNode,
  openWorksheet,
} from "./excel-operations";

/**
 * Represents a single training event with date and participating players
 */
export type TrainingEvent = {
  date: Date;
  players: string[];
};

/**
 * Represents a collection of training events
 */
export type TrainingCalendar = {
  events: TrainingEvent[];
};

/**
 * Parses an Excel file containing training data
 * @param fileInput - Either a file path (Node.js) or File object (Browser)
 * @param config - Configuration object containing parsing settings
 * @returns Promise resolving to a TrainingCalendar object
 * @throws Error if file cannot be read or parsed
 */
export const parseExcelFile = async (
  fileInput: string | File,
  config: Config
): Promise<TrainingCalendar> => {
  // Validate environment compatibility
  if (typeof fileInput === "string" && isBrowser()) {
    throw new Error(
      "String file paths are not supported in browser environment. Please use File object instead."
    );
  }
  if (fileInput instanceof File && isNode()) {
    throw new Error(
      "File objects are not supported in Node.js environment. Please use file path string instead."
    );
  }

  const worksheet = await openWorksheet(fileInput, config.sheetName);
  return createTrainingCalendar(worksheet, config);
};

/**
 * Creates a filtered calendar view for a specific player
 * @param calendar - The complete training calendar
 * @param playerName - The name of the player to filter for
 * @returns A new calendar containing only events where the specified player participated
 */
export const createCalenderForPlayer = (
  calendar: TrainingCalendar,
  playerName: string
): TrainingCalendar => {
  return {
    events: calendar.events
      .map((event) => ({
        date: event.date,
        players: [
          ...event.players.filter((player) => player === playerName),
          ...event.players.filter((player) => player !== playerName),
        ],
      }))
      .filter((event) => event.players.includes(playerName)),
  };
};

/**
 * Calculates training partner statistics for a given player
 * @param calendar - The training calendar containing all events
 * @param playerName - The name of the player to analyze
 * @returns Array of objects containing partner names and number of training sessions together
 */
export const getTrainingPartnerStats = (
  calendar: TrainingCalendar,
  playerName: string
): Array<{ partner: string; occurrences: number }> => {
  // Get only events where the player participated
  const playerEvents = calendar.events.filter((event) =>
    event.players.includes(playerName)
  );

  // Create a map to count occurrences of each training partner
  const partnerCounts = new Map<string, number>();

  playerEvents.forEach((event) => {
    event.players
      .filter((player) => player !== playerName) // Exclude the player themselves
      .forEach((partner) => {
        partnerCounts.set(partner, (partnerCounts.get(partner) || 0) + 1);
      });
  });

  // Convert the map to an array of objects and sort by occurrences
  return Array.from(partnerCounts.entries())
    .map(([partner, occurrences]) => ({ partner, occurrences }))
    .sort((a, b) => b.occurrences - a.occurrences);
};

function createTrainingCalendar(
  worksheet: XLSX.WorkSheet,
  config: Config
): TrainingCalendar {
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
  const trainingDates = parseDateColumns(worksheet, range, config);

  parsePlayers(worksheet, range, config, trainingDates);

  return {
    events: Array.from(trainingDates.values()).filter(
      (event) => event.players.length > 0
    ),
  };
}

function parseDateColumns(
  worksheet: XLSX.WorkSheet,
  range: XLSX.Range,
  config: Config
): Map<number, TrainingEvent> {
  const trainingDates = new Map<number, TrainingEvent>();

  for (let col = config.firstDateColumnIndex; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({
      r: config.dateRowIndex,
      c: col,
    });
    const cell = worksheet[cellAddress];

    const date = extractDateFromCell(cell);
    if (!date) {
      break;
    }

    const weekday = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const startTime = config.startTime[weekday];
    if (!startTime) {
      break; // Skip dates that don't have a configured start time
    }

    const [hours, minutes] = startTime.split(":");
    const trainingDateTime = new Date(date);
    trainingDateTime.setHours(parseInt(hours, 10));
    trainingDateTime.setMinutes(parseInt(minutes, 10));

    trainingDates.set(col, { date: trainingDateTime, players: [] });
  }

  return trainingDates;
}

function parsePlayers(
  worksheet: XLSX.WorkSheet,
  range: XLSX.Range,
  config: Config,
  trainingDates: Map<number, TrainingEvent>
): void {
  for (let row = config.fristPlayerRowIndex; row <= range.e.r; row++) {
    const playerName = getPlayerName(worksheet, row);
    if (!playerName) {
      break;
    }

    processPlayerTrainingDays(worksheet, row, playerName.trim(), trainingDates);
  }
}

function processPlayerTrainingDays(
  worksheet: XLSX.WorkSheet,
  row: number,
  playerName: string,
  trainingDates: Map<number, TrainingEvent>
): void {
  for (const [col, dateInfo] of trainingDates) {
    const cellAddress = XLSX.utils.encode_cell({ r: row, c: Number(col) });
    const cell = worksheet[cellAddress];

    if (cell?.v === 1) {
      dateInfo.players.push(playerName);
    }
  }
}
