import { format } from 'date-fns';
import { Config } from '../parser/config.js';
import { TrainingCalendar } from '../parser/excel-parser.js';

export const createICS = (
  calendar: TrainingCalendar,
  config: Config,
  playerName?: string
): string => {
  // Create ICS header
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TCK Training Calendar//EN',
    'CALSCALE:GREGORIAN',
  ].join('\r\n');

  // Add each event to the calendar
  calendar.events.forEach((event) => {
    const startDate = format(event.date, "yyyyMMdd'T'HHmmss");
    const endDate = format(
      new Date(event.date.getTime() + config.duration * 60000),
      "yyyyMMdd'T'HHmmss"
    );

    // Filter out the specified player from the players list if one is provided
    const playersToShow = playerName
      ? event.players.filter((p) => p !== playerName)
      : event.players;

    icsContent += '\r\nBEGIN:VEVENT';
    icsContent += `\r\nDTSTART:${startDate}`;
    icsContent += `\r\nDTEND:${endDate}`;
    icsContent += `\r\nSUMMARY:Tennis ${config.friendlyName}`;
    icsContent += `\r\nDESCRIPTION:Training mit ${playersToShow.join(', ')}`;
    icsContent += '\r\nEND:VEVENT';
  });

  // Add ICS footer
  icsContent += '\r\nEND:VCALENDAR';

  return icsContent;
};
