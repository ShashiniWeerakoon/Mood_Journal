// filepath: c:\Users\Admin\my-angular-app\src\app\components\mood-entry\mood-stats\mood-stats.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoodService } from '../../../services/mood.service';
import { MoodStats } from '../../../models/mood-stats.model';

@Component({
  selector: 'app-mood-stats',
  templateUrl: './mood-stats.component.html',
  styleUrls: ['./mood-stats.component.css']
})
export class MoodStatsComponent implements OnInit {
  statsFilterForm!: FormGroup;
  moodStats: MoodStats[] = [];
  errorMessage = '';
  users = [
    { id: 1, name: 'User 1' }, 
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' }
  ];

  constructor(private formBuilder: FormBuilder, private moodService: MoodService) { }

  ngOnInit(): void {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    
    this.statsFilterForm = this.formBuilder.group({
      userId: [1],
      startDate: [oneMonthAgo.toISOString().split('T')[0]],
      endDate: [today.toISOString().split('T')[0]]
    });

    this.loadMoodStats();
  }

  loadMoodStats(): void {
    const { userId, startDate, endDate } = this.statsFilterForm.value;
    
    this.moodService.getMoodStats(
      userId, 
      new Date(startDate), 
      new Date(endDate)
    ).subscribe({
      next: (stats) => {
        this.moodStats = stats;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading mood stats', error);
        this.errorMessage = 'Failed to load mood statistics. Please try again.';
      }
    });
  }

  getMoodEmoji(mood: string): string {
    const emojiMap: {[key: string]: string} = {
      'Happy': '😊',
      'Sad': '😢',
      'Stressed': '😰',
      'Excited': '🤩',
      'Angry': '😡',
      'Neutral': '😐',
      'Calm': '😌'
    };
    return emojiMap[mood] || '';
  }

  getMoodColor(mood: string): string {
    const colorMap: {[key: string]: string} = {
      'Happy': '#4caf50',
      'Sad': '#2196f3',
      'Stressed': '#ff9800',
      'Excited': '#e91e63',
      'Angry': '#f44336',
      'Neutral': '#9e9e9e',
      'Calm': '#3f51b5'
    };
    return colorMap[mood] || '#9e9e9e';
  }
}