import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-excel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.scss'],
})
export class UploadExcelComponent {
  @Output() uploadComplete = new EventEmitter<File>();
  isUploading = false;

  constructor(private snackBar: MatSnackBar) {}

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    if (!this.isExcelFile(file)) {
      this.showError('Please upload an Excel file (.xlsx or .xls)');
      return;
    }

    this.isUploading = true;
    try {
      this.uploadComplete.emit(file);
      this.showSuccess('File uploaded successfully');
    } catch (error) {
      this.showError('An unexpected error occurred while processing the file');
    } finally {
      this.isUploading = false;
      // Reset the file input
      input.value = '';
    }
  }

  private isExcelFile(file: File): boolean {
    return ['.xlsx', '.xls'].some((ext) => file.name.toLowerCase().endsWith(ext));
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }
}
