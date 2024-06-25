import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PricesComponent } from '../prices/prices.component';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, PricesComponent, ScheduleComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  activeNav: 'prices' | 'schedule' = 'prices';
}
