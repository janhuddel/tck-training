import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { DEFAULT_CONFIGS, parseExcelFile, TrainingCalendar } from '@tck-training/excel-parser';
import { Subscription } from 'rxjs';
import { TrainingStepperStateService } from './state/training-stepper.state';
import { SelectConfigComponent } from './steps/select-config/select-config.component';
import { SelectPlayerComponent } from './steps/select-player/select-player.component';
import { TrainingCalendarComponent } from './steps/training-calendar/training-calendar.component';
import { UploadExcelComponent } from './steps/upload-excel/upload-excel.component';

@Component({
  selector: 'app-training-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatSnackBarModule,
    UploadExcelComponent,
    SelectConfigComponent,
    SelectPlayerComponent,
    TrainingCalendarComponent,
  ],
  templateUrl: './training-stepper.component.html',
  styleUrls: ['./training-stepper.component.scss'],
})
export class TrainingStepperComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;

  isUploadComplete = false;
  isConfigSelected = false;
  isPlayerSelected = false;
  players: string[] = [];

  private subscription: Subscription | null = null;

  constructor(
    private stateService: TrainingStepperStateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscription = this.stateService.state$.subscribe((state) => {
      this.isUploadComplete = state.isUploadComplete;
      this.isConfigSelected = state.isConfigSelected;
      this.isPlayerSelected = state.isPlayerSelected;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Step 1: File Upload
  onFileUploaded(file: File) {
    this.stateService.setExcelFile(file);
    this.stateService.setUploadComplete(true);

    this.moveToNextStep();
  }

  // Step 2: Config Selection
  async onConfigSelected(config: string) {
    this.stateService.setSelectedConfig(config);
    this.stateService.setConfigSelected(true);

    await this.parseFileWithConfig(config);

    this.moveToNextStep();
  }

  // Step 3: Player Selection
  onPlayerSelected(selectedPlayer: string) {
    this.stateService.setPlayerSelected(true);
    this.stateService.setSelectedPlayer(selectedPlayer);

    this.moveToNextStep();
  }

  private async parseFileWithConfig(configType: string) {
    const uploadedFile = this.stateService.currentState.excelFile;
    if (!uploadedFile) {
      this.showError('No file uploaded');
      return;
    }

    try {
      const calendar = await parseExcelFile(uploadedFile, DEFAULT_CONFIGS[configType]);
      this.stateService.setTrainingCalendar(calendar);

      // extract players from calendar
      this.players = this.getUniquePlayerNames(calendar);
    } catch (error) {
      this.showError('An unexpected error occurred while parsing the file');
    }
  }

  private getUniquePlayerNames(calendar: TrainingCalendar): string[] {
    const playerSet = new Set<string>();
    calendar.events.forEach((event) => {
      event.players.forEach((player) => playerSet.add(player));
    });
    return Array.from(playerSet);
  }

  private moveToNextStep() {
    if (this.stepper) {
      setTimeout(() => {
        this.stepper.next();
      }, 10);
    }
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
}
