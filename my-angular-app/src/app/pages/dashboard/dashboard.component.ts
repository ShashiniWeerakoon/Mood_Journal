import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MoodService, MoodEntry } from '../../services/mood.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  errorMessage: string = '';
  successMessage: string = ''; // ✅ Add success message field

  constructor(private moodService: MoodService) {}

  onSubmit() {
    if (!this.userId || !this.userName || !this.email || !this.mood) {
      this.errorMessage = 'Please fill all required fields';
      this.successMessage = '';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const moodEntry: MoodEntry = {
      userId: parseInt(this.userId),
      mood: this.mood,
      journalText: this.journalText,
      entryDate: this.entryDate
    };

    this.moodService.addMoodEntry(moodEntry).subscribe({
      next: (response) => {
        console.log('Mood entry saved successfully', response);
        this.submitting = false;
        this.successMessage = 'Mood entry submitted successfully!'; // ✅ Show on page
        this.resetForm();

        setTimeout(() => {
      this.successMessage = '';
    }, 3000);
      },

      
      error: (error) => {
        console.error('Error saving mood entry', error);
        this.submitting = false;
        this.errorMessage = 'Failed to save mood entry. Please try again.';
        this.successMessage = '';

        setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
      }
    });
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
    this.errorMessage = '';
    // Don't reset successMessage so it stays visible
  }
}
