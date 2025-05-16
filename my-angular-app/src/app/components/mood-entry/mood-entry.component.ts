import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoodService } from '../../services/mood.service';
import { MoodEntry } from '../../models/mood-entry.model';

@Component({
  selector: 'app-mood-entry',
  templateUrl: './mood-entry.component.html',
  styleUrls: ['./mood-entry.component.css']
})
export class MoodEntryComponent implements OnInit {
  moodForm!: FormGroup;
  moods = ['Happy', 'Sad', 'Stressed', 'Excited', 'Angry', 'Neutral', 'Calm'];
  users = [
    { id: 1, name: 'User 1' }, 
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' }
  ];
  errorMessage = '';
  successMessage = '';
  submitted = false;

  constructor(private formBuilder: FormBuilder, private moodService: MoodService) { }

  ngOnInit(): void {
    this.moodForm = this.formBuilder.group({
      userId: [1, Validators.required],
      mood: ['Happy', Validators.required],
      journalText: ['', Validators.maxLength(500)],
      entryDate: [new Date().toISOString().split('T')[0], Validators.required]
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

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';
    
    if (this.moodForm.invalid) {
      return;
    }

    const moodEntry: MoodEntry = {
      ...this.moodForm.value,
      entryDate: new Date(this.moodForm.value.entryDate)
    };

    this.moodService.addMoodEntry(moodEntry).subscribe({
      next: (response) => {
        console.log('Mood entry added successfully', response);
        this.successMessage = 'Your mood has been recorded successfully!';
        setTimeout(() => this.successMessage = '', 5000); // Clear after 5 seconds
        
        this.moodForm.reset({
          userId: moodEntry.userId,
          mood: 'Happy',
          journalText: '',
          entryDate: new Date().toISOString().split('T')[0]
        });
        this.submitted = false;
      },
      error: (error) => {
        console.error('Error adding mood entry', error);
        this.errorMessage = 'Failed to add mood entry. Please try again.';
      }
    });
  }
}
