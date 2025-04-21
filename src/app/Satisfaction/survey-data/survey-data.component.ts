import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-survey-data',
  templateUrl: './survey-data.component.html',
  styleUrls: ['./survey-data.component.css']
})
export class SurveyDataComponent {
  detail: any;
  rootUrl: any;
  id: any;
  previewImage: any;
  maxRating = 5; // Maximum number of rating columns
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
    this.id = this.route.snapshot.params['id'];
    this.satisfactionDetail();
  }

  satisfactionDetail() {
    this.spinner.show();
    
    this.contentService.getSatisfactionDetail(this.id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.detail = response.data;
          // this.toastrService.success(response.messages, 'Success');
        } else {
          this.toastrService.error(response.messages);
        }
        this.spinner.hide();
      },
      error: (error) => {
        // console.error('Error fetching user details:', error);
        this.toastrService.error('Failed to fetch  details.');
        this.spinner.hide();
      }
    });
  }

  backClicked() {
    this._location.back();
  }
}

