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
    this.initializeForm();
    this.getRequestType();
  }
  
  initializeForm() {
    this.requestForm = this.formBuilder.group({
      username: ['', Validators.required],
      requestTypeId: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      discretion: ['', Validators.required]
    });
  }
  

  get f() {
    return this.requestForm.controls;
  }

  backClicked() {
    this._location.back();
  }

  getRequestType() {
    debugger
    this.content.getRequestType().subscribe(response => {
      if (response.status) {
        this.requestTypeList = response.data;
      }
    });
  }
  
  onSubmit() {
    this.submitted = true;
  
    if (this.requestForm.invalid) {
      return;
    }
  
    this.spinner.show();
  
    const addData = {
      id: 0,
      username: this.requestForm.value.username,
      requestTypeId: this.requestForm.value.requestTypeId,
      phoneNumber: this.requestForm.value.phoneNumber,
      discretion: this.requestForm.value.discretion,
    };
  
    this.content.addRequest(addData).subscribe(
      response => {
        this.spinner.hide();
        if (response.status) {
          // this.toaster.success(response.message);
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
