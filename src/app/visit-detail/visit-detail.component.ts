import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-visit-detail',
  templateUrl: './visit-detail.component.html',
  styleUrls: ['./visit-detail.component.css']
})
export class VisitDetailComponent {
  visitDetails: any;
  rootUrl: any;
  mrn: string = '';  
  visitId!: number; 



  constructor(
    private contentService: ContentService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;

    this.route.queryParams.subscribe((params) => {
      this.mrn = params['mrn'];  
      this.visitId = params['visitId'];  
    
      this.visitDetail();
    });

  }
  

  visitDetail() {
    this.spinner.show();
  
    const params = {
      mrn: this.mrn, 
      visitId: this.visitId,
    };
  
    // Call the service to fetch visit details
    this.contentService.DetailVisit(params).subscribe({
      next: (response) => {
        if (response.status) {
          this.visitDetails = response.data;
        } else {
          this.toastrService.error(response.messages);
        }
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toastrService.error('An error occurred while fetching details.');
      },
    });
  }
  
  
  
  backClicked() {
    this._location.back();
  }



}








