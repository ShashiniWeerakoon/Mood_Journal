// filepath: src/app/pages/history/history.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoodService, MoodEntry } from '../../services/mood.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent] // Add SpinnerComponent here
})
export class HistoryComponent implements OnInit {
  userId: string = '';
  startDate: string = '';
  endDate: string = '';
  maxDate!: string;
  history: MoodEntry[] = [];
  loading: boolean = false;
  submitted: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';

  constructor(private moodService: MoodService) {}

  ngOnInit(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    this.endDate = this.maxDate;
    this.startDate = this.maxDate;
  }

  onEndDateChange(): void {
    if (!this.isEndDateValid()) {
      this.endDate = this.maxDate;
    }
  }

  isEndDateValid(): boolean {
    if (!this.endDate) return true;
    return new Date(this.endDate) <= new Date(this.maxDate);
  }

  fetchHistory(): void {
    this.submitted = true;
    this.loading = true;
    this.isError = false;
    this.errorMessage = '';

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

    this.moodService.getMoodEntriesByDateRange(userIdNumber, this.startDate, this.endDate)
      .subscribe({
        next: (entries: MoodEntry[]) => {
          this.history = entries;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching mood history:', err);
          this.isError = true;
          this.loading = false;

          if (err.status === 0) {
            this.errorMessage = 'Cannot connect to the server. Please check if the backend is running.';
          } else if (err.status === 404) {
            this.errorMessage = 'API endpoint not found. Please check the URL configuration.';
          } else {
            this.errorMessage = 'Failed to load history: ' + (err.error?.message || err.message || 'Unknown error');
          }
        }
      });
  }

  deleteEntry(entryToDelete: any): void {
    this.history = this.history.filter(entry => entry !== entryToDelete);
  }
}
