import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {
  createCalenderForPlayer,
  TrainingCalendar,
} from '@tck-training/excel-parser';
import { Subscription } from 'rxjs';
import { SortPipe } from '../../../pipes/sort.pipe';
import { AppStateService } from '../../../services/app-state.service';
@Component({
  selector: 'app-training-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTableModule,
    FormsModule,
    SortPipe,
  ],
  templateUrl: './training-calendar.component.html',
  styleUrls: ['./training-calendar.component.scss'],
})
export class TrainingCalendarComponent implements OnInit, OnDestroy {
  private playerNameSubscription: Subscription | null = null;
  private trainingCalendarSubscription: Subscription | null = null;

  player: string | null = null;
  trainingCalendar: TrainingCalendar | null = null;

  displayedColumns: string[] = ['date', 'otherPlayers'];
  tableData: { date: Date; otherPlayers: string[] }[] = [];

  constructor(private appState: AppStateService) {}

  ngOnInit(): void {
    this.playerNameSubscription = this.appState.selectedPlayer$.subscribe(
      (player) => {
        this.player = player;
        if (this.trainingCalendar != null && this.player != null) {
          const calenderForPlayer = createCalenderForPlayer(
            this.trainingCalendar,
            this.player
          );
          console.log(this.player, calenderForPlayer);

          this.tableData = calenderForPlayer.events.map((event) => ({
            date: event.date,
            otherPlayers: event.players.filter((p) => p !== this.player),
          }));
        }
      }
    );

    this.trainingCalendarSubscription =
      this.appState.trainingCalendar$.subscribe((calendar) => {
        this.trainingCalendar = calendar;
      });
  }

  ngOnDestroy(): void {
    if (this.playerNameSubscription) {
      this.playerNameSubscription.unsubscribe();
    }

    if (this.trainingCalendarSubscription) {
      this.trainingCalendarSubscription.unsubscribe();
    }
  }
}
