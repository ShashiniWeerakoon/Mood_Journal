import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <!-- Simplified template with just the router outlet -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  // Simplified component with no logic to prevent routing issues
}