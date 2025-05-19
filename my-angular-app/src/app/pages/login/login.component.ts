import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, ReactiveFormsModule]
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false;

  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.resetForm();

    // Listen for navigation to this component
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url === '/login') {
        this.resetForm();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  login(): void {
    if (!this.username || !this.password) {
      this.error = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.error = '';

    setTimeout(() => {
      if (this.username === 'admin' && this.password === '1234') {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid username or password';
      }

      this.isLoading = false;
    }, 1000);
  }

  private resetForm(): void {
    this.username = '';
    this.password = '';
    this.error = '';
  }
}
