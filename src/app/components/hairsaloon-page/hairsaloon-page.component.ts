import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, BarberShop } from '../../services/AuthService';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hairsaloon-page',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './hairsaloon-page.component.html',
  styleUrls: ['./hairsaloon-page.component.css'],
})
export class HairsaloonPageComponent implements OnInit {
  user: BarberShop | null = null;   
  shop: BarberShop | null = null;   

  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    // Dohvati trenutno ulogovanog korisnika (opcionalno)
    this.user = this.auth.getCurrentUser();

    // Dohvati saloon iz URL-a
    const saloonId = this.route.snapshot.paramMap.get('id');
    if (saloonId) {
      this.auth.loadBarberShops().subscribe((shops) => {
        this.shop = shops.find((s) => s.id === saloonId) || null;
      });
    }
  }
}
