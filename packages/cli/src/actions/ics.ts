import {
  createCalenderForPlayer,
  createICS,
  DEFAULT_CONFIGS,
  parseExcelFile,
} from '@tck-training/excel-parser';
export const ics = async (
  file: string,
  options: { player?: string; config: string }
): Promise<void> => {
  const configName = options.config;
  const config = DEFAULT_CONFIGS[configName];

  const calendar = await parseExcelFile(file, config);

  const playerName = options.player;
  const playerCalendar = playerName ? createCalenderForPlayer(calendar, playerName) : calendar;

  const icsContent = createICS(playerCalendar, config, playerName);

  // Print the ICS content to console
  console.log(icsContent);
};
