import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent {
  appointmentDetail: any;
                         
  constructor(
    private route: ActivatedRoute,        
    private toasterService: ToastrService,
    private _location: Location,          

  ) { }                               


  backClicked() {
    this._location.back();
  }
}
