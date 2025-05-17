// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    
    setTimeout(() => {
      const isAuthenticated = this.authService.login(this.username, this.password);
      this.isLoading = false;
      
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }, 1000);
  }
}