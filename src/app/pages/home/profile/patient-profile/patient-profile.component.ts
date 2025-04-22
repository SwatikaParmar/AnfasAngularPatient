import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  doctorList: any;
  rootUrl: any;
  mrn!: string | null;
  detail: any;
  gender: any;

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
     private authService: AuthService,
  ){ }

  ngOnInit(): void {
    debugger
    this.mrn = localStorage.getItem('mrn');

    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.patientDetail();  
  }

  patientDetail(){
debugger
    
    this.contentService.patientDetails(localStorage.getItem('mrn')).subscribe({
      next: (response) => {
        debugger
        if (response.status === true) {
          this.detail = response.data;
          this.gender  = response.data.gender;
         this.toastrService.success(response.message);
        } else {
          this.toastrService.error(response.message);
        }
        this.spinner.hide();
      },
      error: (err) => {
    //    this.toasterService.error('Login failed. Please try again.');
        this.spinner.hide();
        console.error('Login error:', err);
      }
    });

  }
}
