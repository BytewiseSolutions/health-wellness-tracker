import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        console.log('Response keys:', Object.keys(response));
        console.log('Role in response:', response.role);
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.error = 'Invalid email or password';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}