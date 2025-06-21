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
  this.spinner.show();
  this.contentService.requestDetail(id).subscribe({
    next: (response) => {
      if (response.status || response.isSuccess) {
        this.detail = response.data;
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


