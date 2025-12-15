import { Component } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent {
  year = new Date().getFullYear();
  email = '';

  reload() {
    window.location.reload();
  }

  notify() {
    // demo action – replace with API call later
    alert(`Thanks! We'll notify you at: ${this.email}`);
    this.email = '';
  }
}