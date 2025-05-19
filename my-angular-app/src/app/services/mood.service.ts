import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Models (create these interfaces according to your DTOs)
export interface MoodEntry {
  id?: number;
  userId: number;
  mood: string;
  journalText?: string;
  entryDate: string; // Format: 'YYYY-MM-DD'
}

export interface MoodStats {
  mood: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class MoodService {  
  private readonly apiUrl = 'https://localhost:7023/api/Mood'; // Change to your actual API URL

  constructor(private http: HttpClient) {
    console.log('MoodService initialized with API URL:', this.apiUrl);
  }

  // POST: Add a new mood entry
  addMoodEntry(entry: MoodEntry): Observable<number> {
    console.log('Submitting mood entry:', entry);
    
    return this.http.post<number>(`${this.apiUrl}/add`, entry)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error: ${error.status}, message: ${error.message}`;
    }
    
    console.error(errorMessage, error);
    return throwError(() => error);
  }
  // GET: Get mood entries by date range
  getMoodEntriesByDateRange(userId: number, startDate: string, endDate: string): Observable<MoodEntry[]> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<MoodEntry[]>(`${this.apiUrl}/History`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET: Get mood statistics by date range
  getMoodStats(userId: number, startDate: string, endDate: string): Observable<MoodStats[]> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<MoodStats[]>(`${this.apiUrl}/Stats`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  // DELETE: Delete a mood entry by ID
  deleteMoodEntry(entryId: number): Observable<any> {
    console.log('Deleting mood entry with ID:', entryId);
    
    return this.http.delete(`${this.apiUrl}/delete/${entryId}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
