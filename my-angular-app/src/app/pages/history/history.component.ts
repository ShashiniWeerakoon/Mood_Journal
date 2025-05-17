import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  
  standalone: true,
  imports: [CommonModule, SidebarComponent]
})
export class HistoryComponent {
  // Your history component logic
}