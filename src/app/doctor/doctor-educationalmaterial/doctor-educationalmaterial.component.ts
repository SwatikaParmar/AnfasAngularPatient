import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctor-educationalmaterial',
  templateUrl: './doctor-educationalmaterial.component.html',
  styleUrls: ['./doctor-educationalmaterial.component.css']
})
export class DoctorEducationalmaterialComponent {
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
          debugger
          this.detail = response.data.educationMaterialDetail;
          this.patientList = response.data.patients || [];
          this.totalItems = this.patientList.length;
        } else {
          this.toastrService.warning('No data found.');
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error(err);
        this.spinner.hide();
        this.toastrService.error('An error occurred while fetching details.');
      }
    });
  }

  backClicked(): void {
    this._location.back();
  }

  onPageChange(event: number): void {
    this.page = event;
  }

onAssignToggle(event: Event, item: any): void {
  const target = event.target as HTMLInputElement;
  const status = target.checked;

  const payload = {
    materialId: Number(this.id), // Ensure materialId is a number
    mrn: item.mrn,
    status: status // true for assign, false for unassign
  };

  this.contentService.patientAssignd(payload).subscribe({
    next: (response: { isSuccess: boolean; messages?: string }) => {
      if (response.isSuccess) {
        this.toastrService.success(status ? 'Assigned successfully' : 'Unassigned successfully');
        item.isAssigned = status; // Update checkbox state locally
      } else {
        this.toastrService.error(response.messages || 'Assignment failed');
        item.isAssigned = !status; // Revert checkbox UI if API fails
      }
    },
    error: (err) => {
      console.error('Assignment API error:', err);
      this.toastrService.error('Something went wrong during assignment');
      item.isAssigned = !status; // Revert checkbox UI on error
    }
  });
}


}


