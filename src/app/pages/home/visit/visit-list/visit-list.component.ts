import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  visitList: any;
  rootUrl: any;
  labpdf: any;
  rispdf: any;

  
  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.vistList();  
  }
  
  vistList() {
  const mrn = localStorage.getItem('mrn');

  if (!mrn) {
    this.toastrService.error('MRN not found in local storage.');
    return;
  }

  this.spinner.show(); // Start spinner

  this.contentService.getVisit(mrn).subscribe(
    response => {
      this.spinner.hide(); // Stop spinner

      if (response?.status === true) {
        this.visitList = response.data;
      } else {
        this.toastrService.error(response?.message || 'Failed to fetch visit list.');
      }
    },
    error => {
      this.spinner.hide(); // Stop spinner on error
      this.toastrService.error('An error occurred while fetching the visit list.');
      console.error(error);
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

  

  lab(data:any){
    
    let payload = {
      PatientUid : data.patientUid,
      PatientVisitUid :  data.patientVisitUId
    }
    this.contentService.getLab(payload).subscribe(response => {
      if (response.status === true) {
        this.labpdf = response.data.file;  // Get the base64 string from the "file" key
        this.toastrService.success(response.message);
      
        // Convert base64 to Blob and open
        const base64Data = this.labpdf.split(',')[1]; // Remove the "data:application/pdf;base64," prefix
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
      
        // Open PDF in new tab
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      } else {
        this.toastrService.error(response.message);
      }
      
      
    });
  }

  ris(data:any){
    
    let payload = {
      PatientUid : data.patientUid,
      PatientVisitUid :  data.patientVisitUId
    }
    this.contentService.getRis(payload).subscribe(response => {
      if (response.status === true) {
        this.rispdf = response.data.file;  // Get the base64 string from the "file" key
        this.toastrService.success(response.message);
      
        // Convert base64 to Blob and open
        const base64Data = this.rispdf.split(',')[1]; // Remove the "data:application/pdf;base64," prefix
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
      
        // Open PDF in new tab
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      } else {
        this.toastrService.error(response.message);
      }
      
      
    });
  }
getStars(rating: number): string {
  const maxStars = 5;
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(maxStars - rating);
  return filledStars + emptyStars;
}



openSatisfactionForm(satisfactionFormId: number | null, visitId: string) {
  const queryParams: any = { visitId: visitId };
  if (satisfactionFormId) {
    queryParams.id = satisfactionFormId;
  }
  this.router.navigate(['/visit/satisfaction-form'], { queryParams });
}

}
