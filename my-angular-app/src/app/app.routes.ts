import { Routes } from '@angular/router';
import { MoodEntryComponent } from './components/mood-entry/mood-entry.component';
import { MoodHistoryComponent } from './components/mood-entry/mood-history/mood-history.component';
import { MoodStatsComponent } from './components/mood-entry/mood-stats/mood-stats.component';

export const routes: Routes = [
  { path: '', redirectTo: 'mood-entry', pathMatch: 'full' },
  { path: 'mood-entry', component: MoodEntryComponent },
  { path: 'mood-history', component: MoodHistoryComponent },
  { path: 'mood-stats', component: MoodStatsComponent },
  { path: '**', redirectTo: 'mood-entry' }
];
