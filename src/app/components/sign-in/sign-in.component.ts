import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
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
      email: ['', Validators.required, Validators.email], 
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.auth.signIn(email, password).subscribe({
      next: (loggedIn) => {
        if (loggedIn) {
          const user = this.auth.getCurrentUser();
          if (user) {
            this.router.navigate(['/saloon', user.id]);
          }
        } else {
          this.error = 'Invalid username or password';
        }
      },
      error: () => {
        this.error = 'Server error, try again later';
      }
    });
  }

}
