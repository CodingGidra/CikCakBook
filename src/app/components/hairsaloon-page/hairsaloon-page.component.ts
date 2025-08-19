import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, BarberShop } from '../../services/AuthService';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hairsaloon-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './hairsaloon-page.component.html',
  styleUrls: ['./hairsaloon-page.component.css'],
})
export class HairsaloonPageComponent implements OnInit {
  user: BarberShop | null = null;
  shop: BarberShop | null = null;
  selectedDate: Date | null = null;
  selectedTime: string = '';

  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();

    const saloonId = this.route.snapshot.paramMap.get('id');
    if (saloonId) {
      this.auth.loadBarberShops().subscribe((shops) => {
        this.shop = shops.find((s) => s.id === saloonId) || null;
      });
    }
  }

  combinedDateTime(): string | null {
    if (!this.selectedDate || !this.selectedTime) return null;

    const [hours, minutes] = this.selectedTime.split(':').map(Number);
    const d = new Date(this.selectedDate);
    d.setHours(hours, minutes, 0, 0);

    const isoForDb = d.toISOString().slice(0, 16).replace('T', ' ');
    
    return isoForDb;
  }

  bookAppointment() {
    console.log(this.combinedDateTime());
  }
}
