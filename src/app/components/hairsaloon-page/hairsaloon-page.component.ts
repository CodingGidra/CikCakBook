import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-hairsaloon-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './hairsaloon-page.component.html',
  styleUrls: ['./hairsaloon-page.component.css']
})
export class HairsaloonPageComponent implements OnInit {
  user: any = null;
  shop: any = null;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Get the current logged-in user
    this.user = this.auth.getCurrentUser();

    if (this.user) {
      // Option 1: From URL param (id)
      const shopIdFromUrl = Number(this.route.snapshot.paramMap.get('id'));

      // Option 2: From current user (preferred if security matters)
      const shopId = this.user.barberShopId;

      // Fetch that barber shop’s info
      this.shop = this.auth.getBarberShopForUser(this.user.id);
    }
  }
}
