import { Injectable } from '@angular/core';
import { TrainingCalendar } from '@tck-training/excel-parser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private trainingCalendar = new BehaviorSubject<TrainingCalendar | null>(null);
  private selectedPlayer = new BehaviorSubject<string | null>(null);

  get trainingCalendar$(): Observable<TrainingCalendar | null> {
    return this.trainingCalendar.asObservable();
  }

  get selectedPlayer$(): Observable<string | null> {
    return this.selectedPlayer.asObservable();
  }

  setTrainingCalendar(calendar: TrainingCalendar) {
    this.trainingCalendar.next(calendar);
  }

  setSelectedPlayer(player: string) {
    this.selectedPlayer.next(player);
  }
}
