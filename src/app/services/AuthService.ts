import { Injectable } from '@angular/core';

interface User {
  id: number;
  username: string;
  password: string;
  barberShopId: number;
}

interface BarberShop {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { id: 1, username: 'alice', password: 'pass123', barberShopId: 101 },
    { id: 2, username: 'bob', password: 'pass456', barberShopId: 102 },
    { id: 3, username: 'carol', password: 'pass789', barberShopId: 101 }
  ];

  private barberShops: BarberShop[] = [
    { id: 101, name: 'Downtown Barbers' },
    { id: 102, name: 'Uptown Cuts' }
  ];

  private currentUser: User | null = null;

  signIn(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getBarberShopForUser(userId: number): BarberShop | undefined {
    const user = this.users.find(u => u.id === userId);
    return user ? this.barberShops.find(b => b.id === user.barberShopId) : undefined;
  }

  registerSaloonAndAdmin(saloonData: any, adminData: any): void {
    const newBarberShopId = this.barberShops.length > 0
      ? Math.max(...this.barberShops.map(b => b.id)) + 1
      : 101;

    this.barberShops.push({
      id: newBarberShopId,
      name: saloonData.saloonName
    });

    const newUserId = this.users.length > 0
      ? Math.max(...this.users.map(u => u.id)) + 1
      : 1;

    this.users.push({
      id: newUserId,
      username: adminData.adminUsername,
      password: adminData.password,
      barberShopId: newBarberShopId
    });

    this.currentUser = this.users.find(u => u.id === newUserId) || null;
  }
}
