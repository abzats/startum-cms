import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { defaultPrices } from '../../firebase.default-values';
import { FirebaseService, PriceItem } from '../../firebase.service';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss',
})
export class PricesComponent implements OnInit {
  items: PriceItem[] = [];

  isLoading = false;

  constructor(private fb: FirebaseService) {}

  ngOnInit() {
    this.init();
  }

  reset() {
    this.items = defaultPrices;
  }

  save() {
    this.saveValue(this.items);
  }

  private async saveValue(data: PriceItem[]) {
    this.isLoading = true;

    const result = await this.fb.setPrices(data ?? defaultPrices);

    if (!result) {
      alert('Error saving Prices');
    }

    this.init();
  }

  private async init() {
    this.isLoading = true;

    const prices = await this.fb.getPrices();
    if (prices) {
      this.items = prices;
    } else {
      alert('Error fetching Prices');
    }

    this.isLoading = false;
  }
}
