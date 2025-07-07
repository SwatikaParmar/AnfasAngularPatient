import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-xray-detail',
  templateUrl: './xray-detail.component.html',
  styleUrls: ['./xray-detail.component.css']
})
export class XrayDetailComponent {
detail: any;
  rootUrl = environment.rootPathUrl;
  reportId: any;
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
  this.reportId = this.route.snapshot.params['id'];
  this.Detail();
}

Detail(): void {
  this.spinner.show();
  this.contentService.xrayDetail({ reportId: this.reportId }).subscribe({
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
