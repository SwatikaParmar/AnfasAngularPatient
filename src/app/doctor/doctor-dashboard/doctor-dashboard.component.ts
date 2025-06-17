import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {

  fname = localStorage.getItem('dname')

constructor(private router : Router){

}

    goToPatientList() {
    
    this.router.navigate(['/doctor-patient']);
  }
}
