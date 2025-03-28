import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {
  createCalenderForPlayer,
  createICS,
  DEFAULT_CONFIGS,
  TrainingCalendar,
} from '@tck-training/excel-parser';
import { Subscription } from 'rxjs';
import { SortPipe } from '../../../pipes/sort.pipe';
import { TrainingStepperStateService } from '../../state/training-stepper.state';

@Component({
  selector: 'app-training-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    SortPipe,
  ],
  templateUrl: './training-calendar.component.html',
  styleUrls: ['./training-calendar.component.scss'],
})
export class TrainingCalendarComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;

  player: string | null = null;
  trainingCalendar: TrainingCalendar | null = null;
  displayedColumns: string[] = ['date', 'otherPlayers'];
  tableData: { date: Date; otherPlayers: string[] }[] = [];
  selectedConfig: string | null = null;

  constructor(private stateService: TrainingStepperStateService) {}

  ngOnInit(): void {
    this.subscription = this.stateService.state$.subscribe((state) => {
      this.player = state.selectedPlayer;
      this.trainingCalendar = state.trainingCalendar;
      this.selectedConfig = state.selectedConfig;

      if (this.trainingCalendar != null && this.player != null) {
        const calenderForPlayer = createCalenderForPlayer(this.trainingCalendar, this.player);
        this.tableData = calenderForPlayer.events.map((event) => ({
          date: event.date,
          otherPlayers: event.players.filter((p) => p !== this.player),
        }));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  generateICSFile(): void {
    if (!this.trainingCalendar || !this.player || !this.selectedConfig) {
      return;
    }

    const calendarForPlayer = createCalenderForPlayer(this.trainingCalendar, this.player);
    const config = DEFAULT_CONFIGS[this.selectedConfig];

    const icsContent = createICS(calendarForPlayer, config, this.player);

    // Create and download the file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `tennis-training-${this.player.toLowerCase().replace(/\s+/g, '-')}.ics`;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
}
