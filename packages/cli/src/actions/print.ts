import {
  createCalenderForPlayer,
  DEFAULT_CONFIGS,
  parseExcelFile,
  TrainingEvent,
} from "@tck-training/excel-parser";
import { Table } from "console-table-printer";
import { format } from "date-fns";

export const print = async (
  file: string,
  options: { player?: string; config: string }
): Promise<void> => {
  const configName = options.config;
  const calendar = await parseExcelFile(file, DEFAULT_CONFIGS[configName]);

  const playerName = options.player;
  const calendarToDisplay = playerName
    ? createCalenderForPlayer(calendar, playerName)
    : calendar;

  // Create and configure the table
  const table = new Table({
    columns: [
      { name: "Date", alignment: "left" },
      { name: "Time", alignment: "left" },
      { name: "Players", alignment: "left" },
    ],
  });

  // Find the next upcoming event
  const now = new Date();
  const nextEvent = calendarToDisplay.events.find((event) => event.date > now);

  // Add rows to the table
  calendarToDisplay.events.forEach((event: TrainingEvent) => {
    table.addRow(
      {
        Date: format(event.date, "MMM dd, yyyy"),
        Time: format(event.date, "HH:mm"),
        Players: event.players.join(", "),
      },
      // Add color to the next upcoming event
      event === nextEvent ? { color: "green" } : undefined
    );
  });

  // Print the table
  table.printTable();
};
