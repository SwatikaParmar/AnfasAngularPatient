import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-medication-detail',
  templateUrl: './medication-detail.component.html',
  styleUrls: ['./medication-detail.component.css']
})
export class MedicationDetailComponent {
detail: any;
  rootUrl = environment.rootPathUrl;
  medicationId: any;
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
  this.medicationId = this.route.snapshot.params['id'];
  this.Detail();
}

Detail(): void {
  this.spinner.show();
  this.contentService.medicationDetail({ medicationId: this.medicationId }).subscribe({
    next: (response) => {
      if (response.isSuccess) {
        this.detail = response.data;
      } else {
        this.toastrService.error('Failed to fetch details');
      }
      this.spinner.hide();
    },
    error: (err) => {
      this.spinner.hide();
      this.toastrService.error('Error fetching data');
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


