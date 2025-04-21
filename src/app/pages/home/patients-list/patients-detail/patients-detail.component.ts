import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-patients-detail',
  templateUrl: './patients-detail.component.html',
  styleUrls: ['./patients-detail.component.css']
})
export class PatientsDetailComponent {
  detail: any;
  rootUrl: any;
  mrn: string = ''; 
  forPatient: boolean = true; 
  forDoctor: boolean = false; 
  visitsList: any[] = []; 
  Mrn: string | null = '';
  MobilePhone: string | null = '';
  NationalId: string | null = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  mrnUrl: string | null = null;
  isPreviewVisible: boolean = false; // Default to false


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
      this.Mrn = params['Mrn'];  // Retrieve OrgCode
      this.MobilePhone = params['MobilePhone'];  // Retrieve ShowInPatientPortal
      this.NationalId = params['NationalId'];  // Retrieve loginid
  
      // Now that we have the parameters, call the doctorDetail method
      this.patientDetail();
      this.allVisits();
    });
  }
  
  patientDetail() {
    this.spinner.show();
  
    // Prepare the parameters to send to the service
    const params = {
      Mrn: this.Mrn , 
      MobilePhone: this.MobilePhone,
      NationalId: this.NationalId || ''
    };
  
    // Call the service to fetch doctor details with the prepared parameters
    this.contentService.DetailPatient(params).subscribe({
      next: (response) => {
        debugger
        if (response.status) {
          this.detail = response.data;
          this.spinner.hide();
        } else 
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error:', error);
        this.spinner.hide();
        this.toastrService.error('An error occurred while fetching details.');
      }
    });
  }

  navigateToPreview(): void {
    if (this.detail && this.detail.mrn) {
      this.router.navigate(['/patients-list/consentForm'], {
        queryParams: { mrn: this.detail.mrn }
      });
    } else {
      this.toastrService.warning('Consent form ID is missing.');
    }
  }

  getConsentForm() {
    const data = { 
      mrn: this.Mrn
     }; // Prepare the data object
    this.contentService.getConsent(data).subscribe(
      (response: any) => {
        if (response.isSuccess === true) {
          this.mrnUrl = response.data; 
          this.isPreviewVisible = true; // Show the Preview button
        } else {
          this.mrnUrl = null;
          this.isPreviewVisible = false; // Hide the Preview button
        }
      },
      (error) => {
        console.error('Error fetching consent form:', error);
        this.isPreviewVisible = false; // Ensure the button is hidden on error
      }
    );
  }
  backClicked() {
    this._location.back();
  }

  
  allVisits() {
    debugger
    const params = {
      mrn: this.Mrn, 
      forPatient: true,
      forDoctor: false
    };

    this.contentService.getVisits(params).subscribe(
      response => {
       
        if (response.status === true) {
          this.visitsList = response.data;
        
        } else {
          this.toastrService.error('Failed to fetch visit list.');
          console.error('API returned failure:', response);
        }
      },
      error => {
        this.toastrService.error('Error fetching visit list.');
        console.error('Error fetching visit list:', error);
      }
    );
  }
  onPageChange(page: number): void {
    // Update query parameters for pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }

  
      
  editContent(item: any): void {
    this.router.navigate(['/patients-list/visit-detail'], {
      queryParams: {
        mrn: this.Mrn,  
        visitId: item?.visitId,
      }
    });
  }
  
}






