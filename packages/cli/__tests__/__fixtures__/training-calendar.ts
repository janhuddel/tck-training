import { TrainingCalendar } from '@tck-training/excel-parser';

export const trainingCalendarMock: TrainingCalendar = {
  events: [
    {
      date: new Date('2024-09-09 20:00'),
      players: ['Player 1', 'Player 2', 'Player 3', 'Player 10'],
    },
    {
      date: new Date('2024-09-10 20:00'),
      players: ['Player 2', 'Player 6', 'Player 7', 'Player 9'],
    },
  ],
};
