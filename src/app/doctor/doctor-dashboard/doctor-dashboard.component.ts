import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {
images: string[] = [
    'assets/images/Photo3.jpg',
    'assets/images/Photo2.jpg',

  ];
    currentIndex: number = 0;
  fname = localStorage.getItem('dname')

   prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateCarousel();
  }

    updateCarousel() {
    // Update image opacity (ngClass does this now)
    // Update dots (ngClass does this now)
  }

   goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCarousel();
  }
  
constructor(private router : Router){

}

    goToPatientList() {
    
    this.router.navigate(['/doctor-patient']);
  }
}
