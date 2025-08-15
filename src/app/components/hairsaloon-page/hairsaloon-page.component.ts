import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService, BarberShop } from '../../services/AuthService';

@Component({
  selector: 'app-hairsaloon-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './hairsaloon-page.component.html',
  styleUrls: ['./hairsaloon-page.component.css'],
})
export class HairsaloonPageComponent implements OnInit {
  user: BarberShop | null = null;   // opcionalno za Welcome
  shop: BarberShop | null = null;   // ovo je saloon koji prikazujemo

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
