import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent {

    rootUrl: any;
  profileData: any;

    constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
  ){ }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
  this.getDoctorDetail();
  }


  getDoctorDetail(){
this.spinner.show();
    let payload = {
      OrgCode : 'AMC',
      ShowInPatientPortal : true,
      loginid : localStorage.getItem('code')
    }
    this.contentService.getDoctorDeatail(payload).subscribe(response => {
      if(response.status == true) {
this.spinner.hide();
        this.profileData = response.data
      } else {
        this.spinner.hide();
        this.toastrService.error(response.messages);
      }
    })

  }

}
