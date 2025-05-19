import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoodService, MoodStats } from '../../services/mood.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, FormsModule,LoadingSpinnerComponent],
  templateUrl: './stats.component.html'
})
export class StatsComponent {
  userId: string = '';
  startDate: string = '';
  endDate: string = '';
  maxDate: string;
  stats: MoodStats[] = [];
  normalizedStats: MoodStats[] = [];
  submitted = false;
  loading = false;
  errorMessage: string = '';

  constructor(private moodService: MoodService) {
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

  // Normalize moods (e.g., "Happy" and "happy" will be combined)
  normalizeMoodStats(stats: MoodStats[]): MoodStats[] {
    const moodMap = new Map<string, number>();

    stats.forEach(stat => {
      const mood = stat.mood.toLowerCase(); // Normalize to lowercase
      moodMap.set(mood, (moodMap.get(mood) || 0) + stat.count);
    });

    // Convert back to MoodStats[]
    return Array.from(moodMap.entries()).map(([mood, count]) => ({
      mood: this.capitalizeFirstLetter(mood),
      count: count
    }));
  }

  // Capitalize first letter for display
  capitalizeFirstLetter(mood: string): string {
    return mood.charAt(0).toUpperCase() + mood.slice(1);
  }

  fetchStats() {
    this.submitted = true;
    this.loading = true;
    this.errorMessage = '';

    if (!this.userId || !this.startDate || !this.endDate) {
      this.errorMessage = 'Please fill all required fields';
      this.loading = false;
      return;
    }

    const userIdNumber = Number(this.userId);
    this.moodService.getMoodStats(userIdNumber, this.startDate, this.endDate)
      .subscribe({
        next: (data) => {
          this.stats = data;
          this.normalizedStats = this.normalizeMoodStats(data); // Apply normalization
          this.loading = false;

          if (this.stats.length === 0) {
            this.errorMessage = 'No mood data found for the selected criteria.';
          }
        },
        error: (error) => {
          console.error('Error fetching mood stats:', error);
          this.errorMessage = 'Failed to fetch mood statistics. Please try again.';
          this.loading = false;

          if (error.status === 0) {
            this.errorMessage = 'Cannot connect to the server. Please check if the backend is running.';
          } else if (error.status === 404) {
            this.errorMessage = 'API endpoint not found. Please check the URL configuration.';
          } else {
            this.errorMessage = 'Failed to load statistics: ' + (error.error?.message || error.message || 'Unknown error');
          }
        }
      });
  }
}
