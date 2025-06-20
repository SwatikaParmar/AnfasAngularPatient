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
  patientUid: any;
  patientVisitUId: any;
 page1: number = 0;
labdata: any[] = []; // ensure it's always an array

pageMap: { [key: string]: number } = {
  report: 1,
  lab: 1,
  history: 1
};

totalItemsMap: { [key: string]: number } = {
  report: 0,
  lab: 0,
  history: 0
};
  RisData: any;
  mrn: any;




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
                this.patientUid = this.route.snapshot.params['id2'];

                        this.patientVisitUId = this.route.snapshot.params['id3'];
this.mrn = this.route.snapshot.params['id4'];

    this.rootUrl = environment.rootPathUrl;

    // Set dummy patientData for now (replace with actual API data)
  this.getPatietReport();
  }

  setTab(tab: string) {
    this.selectedTab = tab;
  }

  backClicked() {
    this._location.back();
  }

  getPatietReport(){
debugger
    let payload = {
      PatientUid : this.patientUid,
      PatientVisitUid : this.patientVisitUId,
ReportType : "LAB"

    }

    this.contentService.getPatientReport(payload).subscribe(response => {
      if(response.isSuccess == true) {
this.labdata = response.data || [];
this.totalItemsMap['report'] = this.labdata.length;

      } else {

      }
    })
  }

    getPatietRISReport(){
debugger
    let payload = {
      PatientUid : this.patientUid,
      PatientVisitUid : this.patientVisitUId,
ReportType : "RADIOLOGY"

    }

    this.contentService.getPatientReport(payload).subscribe(response => {
      if(response.isSuccess == true) {
this.RisData = response.data || [];
this.totalItemsMap['report'] = this.labdata.length;

      } else {

      }
    })
  }

  lab(data: any) {
    debugger
    this.spinner.show();
    const payload = {
      orderUid : data.orderuid,
      PatientUid: data.patientuid,
      PatientVisitUid: data.patientivisituid
    };
    this.contentService.getLab(payload).subscribe(response => {
      if (response.status === true) {
        this.spinner.hide();
        this.labpdf = response.data.file;
 
        this.openBase64Pdf(this.labpdf);
      } else {
    
      }
    });
  }

  ris(data: any) {
    this.spinner.show();
    const payload = {
        orderUid : data.orderuid,
      PatientUid: data.patientuid,
      PatientVisitUid: data.patientivisituid
    };
    this.contentService.getRis(payload).subscribe(response => {
      if (response.status === true) {
        this.spinner.hide();
        this.rispdf = response.data.file;
  
        this.openBase64Pdf(this.rispdf);
      } else {
        this.spinner.hide();
        // this.toastrService.error(response.message);
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
this.spinner.show();
  let payload = {
    visitId : this.id,
    mrn: this.mrn
  }
debugger
  this.contentService.visitDetail(payload).subscribe(response => {
    if(response.status == true){
      this.spinner.hide();
 this.diagnose = response.data.diagnoses;
 
    }else {
            this.spinner.hide();

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

 
onPageChanges(pageNumber: number, tab: string) {
  this.pageMap[tab] = pageNumber;
}



}


