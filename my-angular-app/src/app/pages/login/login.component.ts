import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  login(): void {
    if (!this.username || !this.password) {
      this.error = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.error = '';

    // Simple mock authentication
    setTimeout(() => {
      if (this.username === 'admin' && this.password === '1234') {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid username or password';
      }
      this.isLoading = false;
    }, 1000);
  }
}