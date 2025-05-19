// filepath: d:\company\New\Mood\my-angular-app\src\app\pages\history\history.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoodService, MoodEntry } from '../../services/mood.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HistoryComponent implements OnInit {
  userId: string = '';
  startDate: string = '';
  endDate: string = '';

  history: MoodEntry[] = [];
  loading: boolean = false;
  submitted: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';

  constructor(private moodService: MoodService) {}

  ngOnInit(): void {
    // Set default dates for the current month
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    this.startDate = formatted;
    this.endDate = formatted;
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate = firstDay.toISOString().split('T')[0];
  }

  fetchHistory(): void {
    this.submitted = true;
    this.loading = true;
    this.isError = false;
    this.errorMessage = '';

    // Validate userId
    if (!this.userId || !this.startDate || !this.endDate) {
      this.isError = true;
      this.errorMessage = 'Please fill all required fields';
      this.loading = false;
      return;
    }

    const userIdNumber = parseInt(this.userId, 10);
    if (isNaN(userIdNumber)) {
      this.isError = true;
      this.errorMessage = 'User ID must be a valid number';
      this.loading = false;
      return;
    }

    // Call the service to get entries
    this.moodService.getMoodEntriesByDateRange(userIdNumber, this.startDate, this.endDate)
      .subscribe({
        next: (entries: MoodEntry[]) => {
          this.history = entries;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching mood history:', err);
          this.isError = true;
          
          if (err.status === 0) {
            this.errorMessage = 'Cannot connect to the server. Please check if the backend is running.';
          } else if (err.status === 404) {
            this.errorMessage = 'API endpoint not found. Please check the URL configuration.';
          } else {
            this.errorMessage = 'Failed to load history: ' + (err.error?.message || err.message || 'Unknown error');
          }
          
          this.loading = false;
        }
      });
  }

  deleteEntry(entryToDelete: any): void {
  this.history = this.history.filter(entry => entry !== entryToDelete);
}

  
  
    }
  

