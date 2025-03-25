import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TrainingCalendar } from '@tck-training/excel-parser';
import { filter, Subscription } from 'rxjs';
import { SortPipe } from '../../../pipes/sort.pipe';
import { AppStateService } from '../../../services/app-state.service';

@Component({
  selector: 'app-select-player',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    SortPipe,
  ],
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.scss'],
})
export class SelectPlayerComponent implements OnInit, OnDestroy {
  @Output() playerSelected = new EventEmitter<void>();

  players: string[] = [];
  selectedPlayer: any | null = null;
  private subscription: Subscription | null = null;

  constructor(private appState: AppStateService) {}

  ngOnInit() {
    this.subscription = this.appState.trainingCalendar$
      .pipe(filter((e) => e !== null))
      .subscribe(
        (calendar) => (this.players = this.getUniquePlayerNames(calendar))
      );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onPlayerSelect(player: string) {
    this.appState.setSelectedPlayer(player);
    this.playerSelected.emit();
  }

  /**
   * Returns a list of unique player names from all training dates
   */
  private getUniquePlayerNames(calendar: TrainingCalendar): string[] {
    const playerSet = new Set<string>();

    calendar.events.forEach((event) => {
      event.players.forEach((player) => playerSet.add(player));
    });

    return Array.from(playerSet);
  }
}
