import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MoodStat {
  mood: string;
  count: number;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats.component.html'
})
export class StatsComponent {
  userId: string = '';
startDate: string = '';
endDate: string = '';
stats: any[] = [];
submitted = false;
loading = false;

// Dummy mood data with userId and entryDate
dummyData = [
  { userId: 'U001', entryDate: '2025-05-15', mood: 'Happy 😊' },
  { userId: 'U001', entryDate: '2025-05-16', mood: 'Sad 😢' },
  { userId: 'U001', entryDate: '2025-05-17', mood: 'Happy 😊' },
  { userId: 'U001', entryDate: '2025-05-18', mood: 'Relaxed 😌' },
  { userId: 'U001', entryDate: '2025-05-18', mood: 'Relaxed 😌' },
  { userId: 'U001', entryDate: '2025-05-19', mood: 'Angry 😠' },
  { userId: 'U001', entryDate: '2025-05-20', mood: 'Happy 😊' },
  { userId: 'U002', entryDate: '2025-05-18', mood: 'Happy 😊' },
];

fetchStats() {
  this.submitted = true;
  this.loading = true;

  setTimeout(() => {
    const filtered = this.dummyData.filter(entry =>
      entry.userId === this.userId &&
      entry.entryDate >= this.startDate &&
      entry.entryDate <= this.endDate
    );

    const moodMap: { [mood: string]: number } = {};
    filtered.forEach(entry => {
      moodMap[entry.mood] = (moodMap[entry.mood] || 0) + 1;
    });

    this.stats = Object.entries(moodMap).map(([mood, count]) => ({ mood, count }));
    this.loading = false;
  }, 500);
}

       
}
