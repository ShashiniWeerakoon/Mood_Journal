// src/app/dashboard/dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
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
