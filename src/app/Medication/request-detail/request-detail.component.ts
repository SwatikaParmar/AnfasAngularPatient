import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent {
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
  const numericId = Number(this.id);

  if (!isNaN(numericId) && numericId > 0) {
    this.Detail(numericId);
  } else {
    this.spinner.hide();
  }
}

Detail(id: number): void {
  const mrn = localStorage.getItem('mrn') || ''; // get MRN safely
  this.spinner.show();

  this.contentService.requestDetail(id, mrn).subscribe({
    next: (response) => {
      if (response.status || response.isSuccess) {
        this.detail = response.data;
      } else {
        // handle false status if needed
      }
      this.spinner.hide();
    },
    error: (err) => {
      this.spinner.hide();
      // handle error if needed
    }
  });
}

  getStatusColor(status: any): string {
    switch (status) {
      case 1:
        return 'orange';  // Yellow or Orange
      case 2:
        return 'green';
      case 3:
        return 'red';
      default:
        return 'black';  // Default color
    }
  }

  backClicked(): void {
    this._location.back();
  }

  onPageChange(event: number): void {
    this.page = event;
  }
}


