import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-edit-lab-service',
  templateUrl: './edit-lab-service.component.html',
  styleUrls: ['./edit-lab-service.component.css']
})
export class EditLabServiceComponent {
  constructor(

    private _location: Location,
    private spinner: NgxSpinnerService
  ) { }

  backClicked() {
    this._location.back();
  }
}
