import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
 
})
export class AppComponent implements OnInit {
  shouldShowSidebar = false;
  
  constructor(private router: Router) {}

  ngOnInit() {
    // Check current route when component initializes
    this.updateSidebarVisibility(this.router.url);
    
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateSidebarVisibility(event.url);
    });
  }
  
  private updateSidebarVisibility(url: string) {
    // Hide sidebar on login page
    this.shouldShowSidebar = !url.includes('/login');
    console.log('Current URL:', url, 'Show sidebar:', this.shouldShowSidebar);
  }
}
