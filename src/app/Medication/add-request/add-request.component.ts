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


  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private formBuilder: FormBuilder,
    private _location: Location,) { }

  ngOnInit(): void {
    this.request();
    // Check if editing
    this.route.params.subscribe(params => {
      this.id = params['id']; // Ensure 'id' matches the route parameter name
    });
  }

  request() {
    this.requestForm = this.formBuilder.group({
      username: ['', Validators.required],
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

  onSubmit() {
    this.submitted = true;

    // Validate form
    if (this.requestForm.invalid) {
      return;
    }
    this.spinner.show();

      // Add new category
      const addData = {
        id: 0, // Default 0 for adding a new category
        username: this.requestForm.value.username,
        requestTypeId: this.requestForm.value.requestTypeId,
        phoneNumber: this.requestForm.value.phoneNumber,
        discretion :this.requestForm.value.discretion,
      };

      this.content.addRequest(addData).subscribe(
        response => {
          this.spinner.hide();
          if (response.isSuccess) {
            this.toaster.success("Request added successfully");
            this.router.navigate(['/request-list']);
          } else {
            this.toaster.error(response.messages);
          }
        },
        error => {
          this.spinner.hide();
          this.toaster.error("An error occurred while adding the Request.");
        }
      );
    }
  

}
