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
  moodEntry = {
    userId: '',
    userName: '',
    email: '',
    date: '',
    mood: '',
    journal: ''
  };

  submitting = false;

  onSubmit() {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      alert('Mood entry submitted successfully!');
      this.moodEntry = {
        userId: '',
        userName: '',
        email: '',
        date: '',
        mood: '',
        journal: ''
      };
    }, 1500); // Simulated loading
  }

  onCancel() {
    this.moodEntry = {
      userId: '',
      userName: '',
      email: '',
      date: '',
      mood: '',
      journal: ''
    };
  }
}
