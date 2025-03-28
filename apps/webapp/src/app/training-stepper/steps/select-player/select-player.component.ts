import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SortPipe } from '../../../pipes/sort.pipe';

@Component({
  selector: 'app-select-player',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, SortPipe],
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.scss'],
})
export class SelectPlayerComponent {
  @Input() players: string[] = [];
  @Output() playerSelected = new EventEmitter<string>();

  selectedPlayer: string | null = null;

  onPlayerSelect(player: string) {
    this.playerSelected.emit(player);
  }
}
