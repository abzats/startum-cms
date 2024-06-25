import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { defaultSchedule } from '../../firebase.default-values';
import { FirebaseService, ScheduleItem } from '../../firebase.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements OnInit {
  items: ScheduleItem[] = [];

  isLoading = false;

  constructor(private fb: FirebaseService) {}

  ngOnInit() {
    this.init();
  }

  reset() {
    this.items = defaultSchedule;
  }

  save() {
    this.saveValue(this.items);
  }

  private async saveValue(data: ScheduleItem[]) {
    this.isLoading = true;

    const result = await this.fb.setSchedule(data ?? defaultSchedule);

    if (!result) {
      alert('Error saving Schedule');
    }

    this.init();
  }

  private async init() {
    this.isLoading = true;

    const prices = await this.fb.getSchedule();
    if (prices) {
      this.items = prices;
    } else {
      alert('Error fetching Schedule');
    }

    this.isLoading = false;
  }
}
