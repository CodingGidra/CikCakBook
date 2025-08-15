import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AuthService, BarberShop } from '../../services/AuthService';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  searchTerm: string = '';
  searchResults: BarberShop[] = [];

  constructor(private authService: AuthService) {}

  onSearch() {
    if (this.searchTerm.length < 3) {
      this.searchResults = [];
      return;
    }

    this.authService.loadBarberShops().subscribe((shops) => {
      this.searchResults = shops.filter(saloonItem =>
        saloonItem.saloonName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
}
