import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {
images: any;
    currentIndex: number = 0;
  fname = localStorage.getItem('dname')
  rootUrl: any;

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
  
constructor(private router : Router,
      private contentService: ContentService,
  
){

}

  ngOnInit() {
      this.rootUrl = environment.root;
    this.getBanner();

  }

    goToPatientList() {
    
    this.router.navigate(['/doctor-patient']);
  }

    getBanner(){
debugger
    this.contentService.getBannerList().subscribe(response => {
      if(response.status == true){
this.images = response.data
      } else {

      }
    })
  }


}
