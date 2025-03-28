import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-config',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  template: `
    <div class="config-selection">
      <mat-form-field appearance="fill">
        <mat-label>Konfigurationstyp auswählen</mat-label>
        <mat-select [(ngModel)]="selectedConfig" (selectionChange)="onConfigSelected()">
          <mat-option value="H50">H50</mat-option>
          <mat-option value="PROVI">PROVI</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [
    `
      .config-selection {
        display: flex;
        justify-content: center;
        padding: 2rem;
      }
      mat-form-field {
        width: 100%;
        max-width: 400px;
      }
    `,
  ],
})
export class SelectConfigComponent {
  @Output() configSelected = new EventEmitter<string>();
  selectedConfig: string = '';

  onConfigSelected() {
    if (this.selectedConfig) {
      this.configSelected.emit(this.selectedConfig);
    }
  }
}
