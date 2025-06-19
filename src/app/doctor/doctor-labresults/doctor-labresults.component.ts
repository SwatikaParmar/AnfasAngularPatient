import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-doctor-labresults',
  templateUrl: './doctor-labresults.component.html',
  styleUrls: ['./doctor-labresults.component.css']
})
export class DoctorLabresultsComponent {
  patientVisitUId: any;
  labData: any;
  pdfUrl!: string;
    pdfUrls!: string;
  risData: any;

 selectedTab: string = 'report';


    constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
  private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private http: HttpClient
  ) {
  
  }

  ngOnInit(): void {
    this.patientVisitUId = this.route.snapshot.params['id'];

     this.getLab();
  }


  getLab(){
  // this.spinner.show();
    this.contentService.getDocLab(this.patientVisitUId).subscribe(response => {
      if(response.status ==true){
this.labData = response.data.file;
//const base64 = this.labResultData?.file; // Your data object with file
  this.spinner.hide();
    this.pdfUrl = this.convertBase64ToPdfUrl(this.labData);
  

      }else {
          this.spinner.hide();

this.toastrService.error(response.messages)
      }
    });
  }


    getRis(){

    this.contentService.getDocLab(this.patientVisitUId).subscribe(response => {
      if(response.status ==true){
this.risData = response.data.file;
//const base64 = this.labResultData?.file; // Your data object with file
  
    this.pdfUrls = this.convertBase64ToPdfUrl(this.risData);
  

      }else {
this.toastrService.error(response.messages)
      }
    });
  }


  convertBase64ToPdfUrl(base64: string): string {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}

   backClicked() {
        this._location.back();
      }  


        setTab(tab: string) {
    this.selectedTab = tab;
  }
}
