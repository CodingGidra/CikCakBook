import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  form: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required], // Matches AuthService property name
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const { username, password } = this.form.value;
    const loggedIn = this.auth.signIn(username, password);

    if (loggedIn) {
      const user = this.auth.getCurrentUser();
      if (user) {
        this.router.navigate(['/saloon', user.barberShopId]);
      }
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
