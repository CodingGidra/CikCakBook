import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-register-saloon',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register-saloon.component.html',
  styleUrls: ['./register-saloon.component.css'],
})
export class RegisterSaloonComponent {
  form: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      saloonName: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      subscription: [0, [Validators.required, Validators.min(0)]],
      category: [''],
      openingHours: [''],
      adminUsername: ['', Validators.required],
      adminEmail: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['admin'],
    });
  }

  submit() {
  this.submitted = true;
  this.errorMessage = '';
  this.successMessage = '';

  if (this.form.invalid) {
    this.errorMessage = 'Please fill all required fields correctly.';
    return;
  }

  const { password, confirmPassword, ...rest } = this.form.value;
  if (password !== confirmPassword) {
    this.errorMessage = 'Passwords do not match.';
    return;
  }

  this.authService.registerSaloon(this.form.value).subscribe({
    next: () => {
      this.successMessage = 'Saloon successfully created!';
      this.form.reset();        // Reset forme
      this.submitted = false;   // Reset submit flag
      // Opcionalno: redirect
      // this.router.navigate(['/sign-in']);
    },
    error: () => {
      this.errorMessage = 'Registration failed';
    }
  });
}

}
