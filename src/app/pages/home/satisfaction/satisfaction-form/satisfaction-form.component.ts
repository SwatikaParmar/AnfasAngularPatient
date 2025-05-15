import { Component,Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-satisfaction-form',
  templateUrl: './satisfaction-form.component.html',
  styleUrls: ['./satisfaction-form.component.css']

})
export class SatisfactionFormComponent {



  rating1 = 0;
  rating2 = 1; // prefilled like in your image
  rating3 = 0;
  selectedRating = 0;
  Form!: FormGroup;
  submitted = false;
  rootUrl: any;
  id: any;
  isEditMode!: boolean;
  Data: any;
  selectedRatings: { [key: string]: number } = {};

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private content: ContentService,
    private toasterService: ToastrService,
    private router: Router,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private languageService: LanguageSwitcherServiceService,
    private _location: Location,
  ) {

  }
  ngOnInit() {

    this.initForm();
    
  }

  initForm() {

    this.Form = this.fb.group(

      {

        id: [0],

        appointmentNumber: [''],

        mrn: [''],

        visitId: [''],

        dateOfVisit: [new Date().toISOString().substring(0, 10)],

        department: [''],

        appointmentEase: [''],

        appointmentWaitTime: [''],

        frontDeskFriendliness: [''],

        facilityCleanliness: [''],

        parkingAvailability: [''],

        waitingAreaComfort: [''],

        doctorFriendliness: [''],

        doctorExplanation: [''],

        doctorTimeSpent: [''],

        treatmentQuality: [''],

        medicationAvailability: [''],

        treatmentExplanation: [''],

        overallSatisfaction: [''],

        recommendationLikelihood: [false],

        additionalComments: [false]

      }

    );

  }



  setRating(field: number, value: number) {
    if (field === 1) this.rating1 = value;
    else if (field === 2) this.rating2 = value;
    else if (field === 3) this.rating3 = value;
  }

  rate(rating: number) {
    this.selectedRating = rating;
    console.log("Rated:", rating);
  }

}