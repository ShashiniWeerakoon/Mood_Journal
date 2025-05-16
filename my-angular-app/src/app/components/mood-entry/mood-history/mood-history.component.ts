import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoodService } from '../../../services/mood.service';
import { MoodEntry } from '../../../models/mood-entry.model';

@Component({
  selector: 'app-mood-history',
  templateUrl: './mood-history.component.html',
  styleUrls: ['./mood-history.component.css']
})
export class MoodHistoryComponent implements OnInit {
  dateFilterForm!: FormGroup;
  moodEntries: MoodEntry[] = [];
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
    
    this.dateFilterForm = this.formBuilder.group({
      userId: [1],
      startDate: [oneMonthAgo.toISOString().split('T')[0]],
      endDate: [today.toISOString().split('T')[0]]
    });

    this.loadMoodHistory();
  }

  loadMoodHistory(): void {
    const { userId, startDate, endDate } = this.dateFilterForm.value;
    
    this.moodService.getMoodHistory(
      userId, 
      new Date(startDate), 
      new Date(endDate)
    ).subscribe({
      next: (entries) => {
        this.moodEntries = entries;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading mood history', error);
        this.errorMessage = 'Failed to load mood history. Please try again.';
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

  formatDate(date: string | Date): string {
    const d = new Date(date);
    return `${d.toLocaleDateString()}`;
  }
}
