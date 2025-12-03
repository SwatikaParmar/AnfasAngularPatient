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
labdata: any; // ensure it's always an array

pageMap: { [key: string]: number } = {
  report: 1,
  summary: 1,
  history: 1
};

totalItemsMap: { [key: string]: number } = {
  report: 0,
  summary: 0,
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

getPatietReport(): void {
  const payload = {
    PatientUid: this.patientUid,
    PatientVisitUid: this.patientVisitUId,
    ReportType: 'LAB',
    PageNumber: this.pageMap['report'],
    PageSize: 50
  };

  this.spinner.show(); // ⏳ Show spinner

  this.contentService.getPatientReport(payload).subscribe({
    next: (response) => {
      if (response.isSuccess) {
        this.labdata = response.data || [];
        this.totalItemsMap['report'] = response.data.length;
      } else {
        this.labdata = [];
        this.totalItemsMap['report'] = 0;
      }
    },
    error: (err) => {   
    },
    complete: () => {
      this.spinner.hide(); // ✅ Hide spinner in all cases
    }
  });
}

getPatietRISReport(): void {
  const payload = {
    PatientUid: this.patientUid,
    PatientVisitUid: this.patientVisitUId,
    ReportType: 'RADIOLOGY',
    PageNumber: this.pageMap['summary'],
    PageSize: 50
  };

  this.spinner.show(); // ⏳ Show spinner

  this.contentService.getPatientReport(payload).subscribe({
    next: (response) => {
      if (response.isSuccess) {
        this.RisData = response.data || [];
        this.totalItemsMap['summary'] = response.data.length;
      } else {
        this.RisData = [];
        this.totalItemsMap['summary'] = 0;
      }
    },
    error: (err) => {
    },
    complete: () => {
      this.spinner.hide(); // ✅ Hide spinner in all cases
    }
  });
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

  // For iOS: Use a secure click-triggered anchor to avoid popup block
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !navigator.userAgent.includes('Macintosh');

  const link = document.createElement('a');
  link.href = blobUrl;
  link.target = '_blank';
  link.download = 'lab-report.pdf';

  // For iOS Safari, we avoid download and force it to open
  if (isIOS) {
    link.setAttribute('rel', 'noopener'); // helps on iOS to open in a new context
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Other platforms
    window.open(blobUrl, '_blank');
  }
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
      debugger
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

 
onPageChanges(page: number, tab: string): void {
  this.pageMap[tab] = page;
  if (tab === 'report') {
    this.getPatietReport();
  } else if (tab === 'summary') {
    this.getPatietRISReport();
  }
}

getTestNames(details: any[]): string {
  return details?.map(test => test.name).join('; ');
}



}


