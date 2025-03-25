import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { AppStateService } from '../services/app-state.service';
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
    UploadExcelComponent,
    SelectPlayerComponent,
    TrainingCalendarComponent,
  ],
  templateUrl: './training-stepper.component.html',
  styleUrls: ['./training-stepper.component.scss'],
})
export class TrainingStepperComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  isUploadComplete = false;
  isPlayerSelected = false;

  constructor(private appState: AppStateService) {}

  onUploadComplete() {
    this.isUploadComplete = true;
    setTimeout(() => {
      this.moveToNextStep();
    });
  }

  onPlayerSelected() {
    this.isPlayerSelected = true;
    this.moveToNextStep();
  }

  private moveToNextStep() {
    if (this.stepper) {
      setTimeout(() => {
        this.stepper.next();
      }, 10);
    }
  }
}
