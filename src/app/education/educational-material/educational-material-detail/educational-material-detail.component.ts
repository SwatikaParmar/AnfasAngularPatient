import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-educational-material-detail',
  templateUrl: './educational-material-detail.component.html',
  styleUrls: ['./educational-material-detail.component.css']
})
export class EducationalMaterialDetailComponent {
  detail: any;
  patientList: any[] = [];
  rootUrl = environment.rootPathUrl;
  id: string | null = null;
  page = 1;
  totalItems = 0;

  constructor(
    private contentService: ContentService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.loadDetail();
    }
  }

  loadDetail(): void {
    this.spinner.show();
    this.contentService.geteducationalMaterialDetail(this.id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.detail = response.data.educationMaterialDetail;
          this.patientList = response.data.patients || [];
          this.totalItems = this.patientList.length;
        } else {
    
        }
        this.spinner.hide();
      },
      error: (err) => {
   
        this.spinner.hide();

      }
    });
  }

  backClicked(): void {
    this._location.back();
  }

  onPageChange(event: number): void {
    this.page = event;
  }
}

