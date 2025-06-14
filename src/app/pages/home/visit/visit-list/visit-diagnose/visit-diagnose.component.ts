import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-visit-diagnose',
  templateUrl: './visit-diagnose.component.html',
  styleUrls: ['./visit-diagnose.component.css']
})
export class VisitDiagnoseComponent {
 pdfUrl: string = '';
  pdfUrls: string = '';
  selectedTab: string = 'report';
  patientData: any;  // holds patientUid and patientVisitUId
  rootUrl: any;
  labpdf: any;
  rispdf: any;
  diagnose: any;
  id: any;
 page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

    this.rootUrl = environment.rootPathUrl;

    // Set dummy patientData for now (replace with actual API data)
    this.patientData = {
      patientUid: '123456',
    patientVisitUId: 'abc123'
    };
  }

  setTab(tab: string) {
    this.selectedTab = tab;
  }

  backClicked() {
    this._location.back();
  }

  lab(data: any) {
    const payload = {
      PatientUid: data.patientUid,
      PatientVisitUid: data.patientVisitUId
    };
    this.contentService.getLab(payload).subscribe(response => {
      if (response.status === true) {
        this.labpdf = response.data.file;
        this.toastrService.success(response.message);
        this.openBase64Pdf(this.labpdf);
      } else {
        this.toastrService.error(response.message);
      }
    });
  }

  ris(data: any) {
    const payload = {
      PatientUid: data.patientUid,
      PatientVisitUid: data.patientVisitUId
    };
    this.contentService.getRis(payload).subscribe(response => {
      if (response.status === true) {
        this.rispdf = response.data.file;
        this.toastrService.success(response.message);
        this.openBase64Pdf(this.rispdf);
      } else {
        this.toastrService.error(response.message);
      }
    });
  }

  openBase64Pdf(base64: string) {
    const base64Data = base64.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  }


  
getVisitDetail(){

  let payload = {
    visitId : this.id,
    mrn: localStorage.getItem('mrn')
  }
debugger
  this.contentService.visitDetail(payload).subscribe(response => {
    if(response.status == true){
 this.diagnose = response.data.diagnoses;
 
    }else {
     this.toastrService.error(response.message)
    }
  })
}


onPageChange(page: number): void {
    // Update query parameters for pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }

  

}


