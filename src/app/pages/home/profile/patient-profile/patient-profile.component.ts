import { Component, OnInit } from '@angular/core';
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
export class PatientProfileComponent implements OnInit {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  doctorList: any;
  rootUrl: string = environment.rootPathUrl;
  mrn: string | null = null;
  detail: any = {};
  gender: any;

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.mrn = localStorage.getItem('mrnNumber');
    if (!this.mrn) {
      this.toastrService.error('MRN not found in localStorage.');
      this.spinner.hide();
      return;
    }

    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });

    this.patientDetail();
  }

  patientDetail(): void {
    this.contentService.patientDetails(this.mrn).subscribe({
      next: (response) => {
        if (response.status === true) {
          this.detail = response.data;
          this.gender = response.data.gender;
        } else {
          this.toastrService.error(response.message);
        }
        this.spinner.hide();
      },
      error: (err) => {
        this.toastrService.error('Failed to fetch patient details.');
        this.spinner.hide();
        console.error('Error fetching patient details:', err);
      }
    });
  }

  navigateToPreview(): void {
    if (this.detail?.mrn) {
      this.router.navigate(['/profile/consent'], {
        queryParams: { mrn: this.detail.mrn }
      });
    } else {
      this.toastrService.warning('Consent form ID is missing.');
    }
  }
}
