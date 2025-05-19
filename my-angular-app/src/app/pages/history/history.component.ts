import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MoodEntry {
  userId: string;
  entryDate: string;
  mood: string;
  journalText: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HistoryComponent {
  userId: string = '';
  startDate: string = '';
  endDate: string = '';

  history: MoodEntry[] = [];
  loading: boolean = false;
  submitted: boolean = false;

  allEntries: MoodEntry[] = [
    {
      userId: 'U001',
      entryDate: '2025-05-15',
      mood: 'Happy 😊',
      journalText: 'Had a great day!'
    },
    {
      userId: 'U001',
      entryDate: '2025-05-17',
      mood: 'Sad 😢',
      journalText: 'Feeling a bit low today.'
    },
    {
      userId: 'U002',
      entryDate: '2025-05-16',
      mood: 'Angry 😠',
      journalText: 'Too many things went wrong.'
    }
  ];

  fetchHistory(): void {
    this.submitted = true;
    this.loading = true;

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    setTimeout(() => {
      this.history = this.allEntries.filter((entry: MoodEntry) => {
        const date = new Date(entry.entryDate);
        return (
          entry.userId === this.userId &&
          date >= start &&
          date <= end
        );
      });
      this.loading = false;
    }, 500); // simulate loading delay
  }
}
