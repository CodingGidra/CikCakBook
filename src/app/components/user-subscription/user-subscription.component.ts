import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  card = {
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  };

  confirmSubscription() {
    console.log('Subscribing to saloon:', this.saloonId);
    console.log('Card info:', this.card);

    // ovdje kasnije ide backend call za stvarno plaćanje
  }

  cancel() {
    this.router.navigate(['/saloon', this.saloonId]);
  }
}
