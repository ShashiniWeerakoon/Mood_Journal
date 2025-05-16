import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { MoodEntryComponent } from './components/mood-entry/mood-entry.component';
import { MoodHistoryComponent } from './components/mood-entry/mood-history/mood-history.component';
import { LoadingSpinnerComponent } from './components/mood-entry/Loading-spinner/loading-spinner.component';
import { MoodStatsComponent } from './components/mood-entry/mood-stats/mood-stats.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    MoodEntryComponent,
    MoodHistoryComponent,
    LoadingSpinnerComponent,
    MoodStatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }