import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent {
  requestForm!: FormGroup;
  submitted = false;
  id: any;
  requestTypeList: any;


  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _location: Location
  ) { }
  

 ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id');
  this.initializeForm();
  this.getRequestType();

  if (this.id) {
    this.getRequestDetails(this.id);
  }
}


  
  initializeForm() {
    this.requestForm = this.formBuilder.group({
       username: [localStorage.getItem('mrn') || '', Validators.required],
      requestTypeId: ['', Validators.required],
      discretion: ['', Validators.required]
    });
  }
  
getRequestDetails(id: number) {
  this.content.requestDetail(id).subscribe((response: any) => {
    if (response.status) {
      this.requestForm.patchValue({
        requestTypeId: response.data.requestTypeId,
        discretion: response.data.discretion
      });
    }
  });
}

  get f() {
    return this.requestForm.controls;
  }

  backClicked() {
    this._location.back();
  }

  getRequestType() {
    
    this.content.getRequestType().subscribe(response => {
      if (response.status) {
        this.requestTypeList = response.data;
      }
    });
  }
  
 onSubmit() {
  debugger
  this.submitted = true;

  if (this.requestForm.invalid) {
    return;
  }

  this.spinner.show();
debugger
  const requestData = {
    id: this.id ? Number(this.id) : 0,
    username: localStorage.getItem('mrn'),
    requestTypeId: this.requestForm.value.requestTypeId,
    discretion: this.requestForm.value.discretion
  };

  const requestCall = this.id
    ? this.content.addRequest(requestData)
    : this.content.addRequest(requestData);

  requestCall.subscribe(
    response => {
      this.spinner.hide();
      if (response.status) {
        const message = this.id ? 'Updated successfully' : 'Added successfully';
        this.toaster.success(message);
        this.router.navigate(['/request-list']);
      } else {
        this.toaster.error(response.message || 'Failed to save request');
      }
    },
    error => {
      this.spinner.hide();
      this.toaster.error('Something went wrong');
    }
  );
}

  
 
}
