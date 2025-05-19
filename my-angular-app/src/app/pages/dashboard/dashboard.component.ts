import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  userId: string = '';
  userName: string = '';
  email: string = '';
  entryDate: string = new Date().toISOString().split('T')[0]; // Today's date
  mood: string = '';
  journalText: string = '';

  submitting = false;

  onSubmit() {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      alert('Mood entry submitted successfully!');
      this.resetForm();
    }, 1500); // Simulated loading
  }

  onCancel() {
    this.resetForm();
  }

  resetForm() {
    this.userId = '';
    this.userName = '';
    this.email = '';
    this.entryDate = new Date().toISOString().split('T')[0];
    this.mood = '';
    this.journalText = '';
  }
}
