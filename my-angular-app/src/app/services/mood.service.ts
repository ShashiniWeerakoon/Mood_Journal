import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoodEntry } from '../models/mood-entry.model';
import { MoodStats } from '../models/mood-stats.model';

import { MockMoodService } from './mock/mock-mood.service';

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  private apiUrl = 'api/mood';
  private mockService: MockMoodService;
  
  constructor(private http: HttpClient) {
    this.mockService = new MockMoodService();
  }

  addMoodEntry(entry: MoodEntry): Observable<any> {
    // Use mock service for development, real API for production
    if (true) { // Change to environment.useMockAPI when available
      return this.mockService.addMoodEntry(entry);
    }
    return this.http.post(`${this.apiUrl}/add`, entry);
  }

  getMoodHistory(userId: number, startDate: Date, endDate: Date): Observable<MoodEntry[]> {
    // Use mock service for development, real API for production
    if (true) { // Change to environment.useMockAPI when available
      return this.mockService.getMoodHistory(userId, startDate, endDate);
    }
    
    let params = new HttpParams()
      .set('userId', userId.toString())
      .set('startDate', startDate.toISOString().split('T')[0])
      .set('endDate', endDate.toISOString().split('T')[0]);
    
    return this.http.get<MoodEntry[]>(`${this.apiUrl}/history`, { params });
  }

  getMoodStats(userId: number, startDate: Date, endDate: Date): Observable<MoodStats[]> {
    // Use mock service for development, real API for production
    if (true) { // Change to environment.useMockAPI when available
      return this.mockService.getMoodStats(userId, startDate, endDate);
    }
    
    let params = new HttpParams()
      .set('userId', userId.toString())
      .set('startDate', startDate.toISOString().split('T')[0])
      .set('endDate', endDate.toISOString().split('T')[0]);
    
    return this.http.get<MoodStats[]>(`${this.apiUrl}/stats`, { params });
  }
}
