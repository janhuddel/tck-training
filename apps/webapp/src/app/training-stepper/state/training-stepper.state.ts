import { Injectable } from '@angular/core';
import { TrainingCalendar } from '@tck-training/excel-parser';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TrainingStepperState {
  isUploadComplete: boolean;
  isConfigSelected: boolean;
  isPlayerSelected: boolean;
  excelFile: File | null;
  trainingCalendar: TrainingCalendar | null;
  selectedPlayer: string | null;
  selectedConfig: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class TrainingStepperStateService {
  private state = new BehaviorSubject<TrainingStepperState>({
    isUploadComplete: false,
    isConfigSelected: false,
    isPlayerSelected: false,
    excelFile: null,
    trainingCalendar: null,
    selectedPlayer: null,
    selectedConfig: null,
  });

  get state$(): Observable<TrainingStepperState> {
    return this.state.asObservable();
  }

  get currentState(): TrainingStepperState {
    return this.state.value;
  }

  setUploadComplete(isComplete: boolean) {
    this.updateState({ isUploadComplete: isComplete });
  }

  setConfigSelected(isSelected: boolean) {
    this.updateState({ isConfigSelected: isSelected });
  }

  setSelectedConfig(config: string) {
    this.updateState({ selectedConfig: config });
  }

  setPlayerSelected(isSelected: boolean) {
    this.updateState({ isPlayerSelected: isSelected });
  }

  setTrainingCalendar(calendar: TrainingCalendar) {
    this.updateState({ trainingCalendar: calendar });
  }

  setSelectedPlayer(player: string) {
    this.updateState({ selectedPlayer: player });
  }

  setExcelFile(file: File) {
    this.updateState({ excelFile: file });
  }

  private updateState(partialState: Partial<TrainingStepperState>) {
    this.state.next({
      ...this.state.value,
      ...partialState,
    });
  }
}
