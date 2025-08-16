import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BarberShop {
  id: string;
  saloonName: string;
  location: string;
  address: string;
  description?: string;
  subscription?: number;
  category?: string;
  openingHours?: string;
  adminUsername: string;
  adminEmail?: string;
  phone?: string;
  password: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private barberShops: BarberShop[] = [];
  private currentUser: BarberShop | null = null;
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Sign in provjera preko servera
  signIn(username: string, password: string): Observable<boolean> {
    return this.http.get<BarberShop[]>(`${this.apiUrl}/barberShops`).pipe(
      map((shops) => {
        const user = shops.find(
          (s) => s.adminUsername === username && s.password === password
        );
        if (user) {
          this.currentUser = user;
          return true;
        }
        return false;
      })
    );
  }

  getSaloonById(): BarberShop | null {
    return this.currentUser;
  }

  getCurrentUser(): BarberShop | null {
    return this.currentUser;
  }

  // Register new barber shop
  registerSaloon(formData: BarberShop) {
    return this.http.post(`${this.apiUrl}/barberShops`, formData);
  }

  // Optionally: load barberShops from API (for testing/mock)
  loadBarberShops() {
    return this.http.get<BarberShop[]>(`${this.apiUrl}/barberShops`);
  }
}
