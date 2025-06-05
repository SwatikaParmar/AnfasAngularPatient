import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-doctor-addmedication',
  templateUrl: './doctor-addmedication.component.html',
  styleUrls: ['./doctor-addmedication.component.css']
})
export class DoctorAddmedicationComponent {

  medicationForm!: FormGroup;
  mrn: any;

    constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder,
  ){ }


    ngOnInit(): void {
      this.mrn = this.route.snapshot.params['id'];

       this.medicationForm = this.fb.group({
      mrn: this.mrn,
      careProviderCode: [localStorage.getItem('code'),],
      medicationName: ['', Validators.required],
      dosage: ['', Validators.required],
      frequency: ['', Validators.required],
      instructions: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }


  addMedication(){
  if (this.medicationForm.invalid) {
    this.medicationForm.markAllAsTouched(); // 👈 This will trigger validation messages
    return;
  }
   
    this.contentService.addMedication(this.medicationForm.value).subscribe( resposne => {
      if(resposne.isSuccess == true){
        this.toastrService.success(resposne.messages);
  this._location.back();
     } else {
        this.toastrService.error(resposne.messages);
      }
    })
    
  }



     backClicked() {
        this._location.back();
      } 
  }


