import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/landing-page/landing-page.component').then(m => m.LandingPageComponent)
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./components/sign-in/sign-in.component').then(m => m.SignInComponent)
  },
  {
    path: 'register-saloon',
    loadComponent: () =>
      import('./components/register-saloon/register-saloon.component').then(m => m.RegisterSaloonComponent)
  },
  {
    path: 'saloon/:id',
    loadComponent: () =>
      import('./components/hairsaloon-page/hairsaloon-page.component').then(m => m.HairsaloonPageComponent)
  }
];
