// doctor-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctorDetails: any;
  rootUrl: any;
  OrgCode: string | null = '';
  ShowInPatientPortal: string | null = '';
  loginid: string | null = '';

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
  
    // Capture query parameters and assign them to component properties
    this.route.queryParams.subscribe((params) => {
      this.OrgCode = params['OrgCode'];  // Retrieve OrgCode
      this.ShowInPatientPortal = params['ShowInPatientPortal'];  // Retrieve ShowInPatientPortal
      this.loginid = params['loginid'];  // Retrieve loginid
  
      // Now that we have the parameters, call the doctorDetail method
      this.doctorDetail();
    });
  }
  
  doctorDetail() {
    this.spinner.show();
  
    // Prepare the parameters to send to the service
    const params = {
      OrgCode: this.OrgCode || 'AMC', // Default 'AMC' if not provided
      ShowInPatientPortal: this.ShowInPatientPortal !== undefined ? this.ShowInPatientPortal : true,
      loginid: this.loginid || ''
    };
  
    // Call the service to fetch doctor details with the prepared parameters
    this.contentService.DetailDoctor(params).subscribe({
      next: (response) => {
        if (response.status) {
          this.doctorDetails = response.data;
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
