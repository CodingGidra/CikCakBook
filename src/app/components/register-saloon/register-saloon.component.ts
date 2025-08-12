import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/AuthService'; // Your updated AuthService

@Component({
  selector: 'app-register-saloon',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './register-saloon.component.html',
  styleUrls: ['./register-saloon.component.css']
})
export class RegisterSaloonComponent {
  form: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      // Saloon Info
      saloonName: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      subscription: [0, [Validators.required, Validators.min(0)]],
      category: [''],
      openingHours: [''],

      // Admin Info
      adminUsername: ['', Validators.required],
      adminEmail: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['admin']
    });
  }

  submit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const { password, confirmPassword, ...rest } = this.form.value;
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Separate data into saloonData and adminData for AuthService
    const saloonData = {
      saloonName: rest.saloonName,
      location: rest.location,
      description: rest.description,
      subscription: rest.subscription,
      category: rest.category,
      openingHours: rest.openingHours
    };

    const adminData = {
      adminUsername: rest.adminUsername,
      adminEmail: rest.adminEmail,
      phone: rest.phone,
      password: password
      // 'role' is fixed as 'admin', we don't need to pass here
    };

    // Call the new service method
    this.auth.registerSaloonAndAdmin(saloonData, adminData);

    // Redirect the new admin directly to their saloon page
    const user = this.auth.getCurrentUser();
    if (user) {
      this.router.navigate(['/saloon', user.barberShopId]);
    }
  }
}
