import { Component } from '@angular/core';
import { CoreService } from '@tck-training/excel-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  greeting: string;

  constructor() {
    const coreService = new CoreService();
    this.greeting = coreService.greet('John');
  }
}
