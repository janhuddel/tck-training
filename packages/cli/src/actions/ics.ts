import {
  createCalenderForPlayer,
  DEFAULT_CONFIGS,
  parseExcelFile,
} from '@tck-training/excel-parser';
import { format } from 'date-fns';

export const ics = async (
  file: string,
  options: { player?: string; config: string }
): Promise<void> => {
  const configName = options.config;
  const calendar = await parseExcelFile(file, DEFAULT_CONFIGS[configName]);

  const playerName = options.player;
  const playerCalendar = playerName ? createCalenderForPlayer(calendar, playerName) : calendar;

  // Create ICS header
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TCK Training Calendar//EN',
    'CALSCALE:GREGORIAN',
  ].join('\r\n');

  // Add each event to the calendar
  playerCalendar.events.forEach((event) => {
    const startDate = format(event.date, "yyyyMMdd'T'HHmmss");
    const endDate = format(
      new Date(event.date.getTime() + DEFAULT_CONFIGS[configName].duration * 60000),
      "yyyyMMdd'T'HHmmss"
    );

    // Filter out the specified player from the players list if one is provided
    const playersToShow = playerName
      ? event.players.filter((p) => p !== playerName)
      : event.players;

    icsContent += '\r\nBEGIN:VEVENT';
    icsContent += `\r\nDTSTART:${startDate}`;
    icsContent += `\r\nDTEND:${endDate}`;
    icsContent += `\r\nSUMMARY:Tennis ${configName}`;
    icsContent += `\r\nDESCRIPTION:Training mit ${playersToShow.join(', ')}`;
    icsContent += '\r\nEND:VEVENT';
  });

  // Add ICS footer
  icsContent += '\r\nEND:VCALENDAR';

  // Print the ICS content to console
  console.log(icsContent);
};
