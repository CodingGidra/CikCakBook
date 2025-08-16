import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../../services/AuthService';

@Component({
  selector: 'app-user-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-subscription.component.html',
  styleUrls: ['./user-subscription.component.css']
})
export class UserSubscriptionComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  saloonId: string | null = this.route.snapshot.paramMap.get('id');
  saloonName: string = '';

  constructor(private authService: AuthService) {}

  card = {
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  };

  ngOnInit(): void {
    // Dohvati ID iz URL-a
    this.saloonId = this.route.snapshot.paramMap.get('id');

    if (this.saloonId) {
    this.authService.getBarberShopById(this.saloonId).subscribe(shop => {
      if (shop) {
        this.saloonName = shop.saloonName;
      }
    });
  }
  }

  confirmSubscription() {
    console.log('Subscribing to saloon:', this.saloonId);
    console.log('Card info:', this.card);

    // ovdje kasnije ide backend call za stvarno plaćanje
  }

  cancel() {
    this.router.navigate(['/saloon', this.saloonId]);
  }
}
