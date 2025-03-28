import { Config, H50, PROVI } from './parser/config.js';

export {
  createCalenderForPlayer,
  getTrainingPartnerStats,
  parseExcelFile,
} from './parser/excel-parser.js';

export type { TrainingCalendar, TrainingEvent } from './parser/excel-parser.js';

export const DEFAULT_CONFIGS: Record<string, Config> = {
  H50,
  PROVI,
};
