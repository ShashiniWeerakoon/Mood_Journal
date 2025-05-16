// filepath: c:\Users\Admin\my-angular-app\src\app\services\mock\mock-mood.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MoodEntry } from '../../models/mood-entry.model';
import { MoodStats } from '../../models/mood-stats.model';

@Injectable({
  providedIn: 'root'
})
export class MockMoodService {
  private mockMoodEntries: MoodEntry[] = [
    {
      userId: 1,
      mood: 'Happy',
      journalText: 'Had a great day today! Met with friends and enjoyed the weather.',
      entryDate: new Date('2025-05-01')
    },
    {
      userId: 1,
      mood: 'Stressed',
      journalText: 'Work was overwhelming today. Too many deadlines coming up.',
      entryDate: new Date('2025-05-03')
    },
    {
      userId: 1,
      mood: 'Calm',
      journalText: 'Took time to relax and meditate, feeling better now.',
      entryDate: new Date('2025-05-05')
    },
    {
      userId: 1,
      mood: 'Excited',
      journalText: 'Planning a trip next month, looking forward to it!',
      entryDate: new Date('2025-05-10')
    },
    {
      userId: 2,
      mood: 'Sad',
      journalText: 'Missing my family, should call them more often.',
      entryDate: new Date('2025-05-02')
    },
    {
      userId: 2,
      mood: 'Happy',
      journalText: 'Got a promotion at work! Celebrating tonight.',
      entryDate: new Date('2025-05-08')
    },
    {
      userId: 3,
      mood: 'Neutral',
      journalText: 'Regular day, nothing special happened.',
      entryDate: new Date('2025-05-04')
    }
  ];

  constructor() { }

  addMoodEntry(entry: MoodEntry): Observable<any> {
    // Simulate server delay and response
    console.log('Mock: Adding mood entry', entry);
    this.mockMoodEntries.push({...entry});
    return of({ success: true, message: 'Entry added successfully' }).pipe(delay(800));
  }

  getMoodHistory(userId: number, startDate: Date, endDate: Date): Observable<MoodEntry[]> {
    // Filter entries based on userId and date range
    const filteredEntries = this.mockMoodEntries.filter(entry => {
      const entryDate = new Date(entry.entryDate);
      return entry.userId === userId && 
             entryDate >= startDate && 
             entryDate <= endDate;
    });

    console.log('Mock: Fetching mood history', { userId, startDate, endDate, entries: filteredEntries });
    return of(filteredEntries).pipe(delay(1000));
  }

  getMoodStats(userId: number, startDate: Date, endDate: Date): Observable<MoodStats[]> {
    // Generate mock stats
    const filteredEntries = this.mockMoodEntries.filter(entry => {
      const entryDate = new Date(entry.entryDate);
      return entry.userId === userId && 
             entryDate >= startDate && 
             entryDate <= endDate;
    });

    // Count occurrences of each mood
    const moodCounts = filteredEntries.reduce((acc, entry) => {
      if (!acc[entry.mood]) {
        acc[entry.mood] = 0;
      }
      acc[entry.mood]++;
      return acc;
    }, {} as Record<string, number>);

    // Convert to MoodStats array
    const stats = Object.keys(moodCounts).map(mood => ({
      mood,
      count: moodCounts[mood],
      percentage: (moodCounts[mood] / filteredEntries.length) * 100
    }));

    console.log('Mock: Fetching mood stats', { userId, startDate, endDate, stats });
    return of(stats).pipe(delay(1000));
  }
}