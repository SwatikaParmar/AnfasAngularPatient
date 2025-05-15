import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
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
  visitId: any;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private content: ContentService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private languageService: LanguageSwitcherServiceService,
    private _location: Location,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.initForm();
    this.rootUrl = environment.rootPathUrl;

    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.visitId = params['visitId']; // ✅ Capture visitId

      if (this.id) {
        this.isEditMode = true;
        this.getDetail();
      } else {
        // If it's a new form, patch visitId directly
        this.Form.patchValue({ visitId: this.visitId });
      }
    });
  }


  initForm() {
    this.Form = this.fb.group(
      {
        id: [0],
        appointmentNumber: [''],
        mrn: [''],
        visitId: [''],
        dateOfVisit: [''],
        department: [''],
        appointmentEase: [0],
        appointmentWaitTime: [0],
        frontDeskFriendliness: [0],
        facilityCleanliness: [0],
        parkingAvailability: [0],
        waitingAreaComfort: [0],
        doctorFriendliness: [0],
        doctorExplanation: [0],
        doctorTimeSpent: [0],
        treatmentQuality: [0],
        medicationAvailability: [0],
        treatmentExplanation: [0],
        overallSatisfaction: [0],
        recommendationLikelihood: [0],
        additionalComments: ['']
      }

    );
  }

getDetail() {
  this.content.satisfactionDetail(this.id).subscribe((res: any) => {
  if (res.isSuccess && res.data) {
    const data = res.data;
    this.Form.patchValue({
      dateOfVisit: data.dateOfVisit.split('T')[0], // Format to 'YYYY-MM-DD' for input[type="date"]
      appointmentEase: data.appointmentEase,
      appointmentWaitTime: data.appointmentWaitTime,
      frontDeskFriendliness: data.frontDeskFriendliness,
      facilityCleanliness: data.facilityCleanliness,
      parkingAvailability: data.parkingAvailability,
      waitingAreaComfort: data.waitingAreaComfort,
      doctorFriendliness: data.doctorFriendliness,
      doctorExplanation: data.doctorExplanation,
      doctorTimeSpent: data.doctorTimeSpent,
      treatmentQuality: data.treatmentQuality,
      medicationAvailability: data.medicationAvailability,
      treatmentExplanation: data.treatmentExplanation,
      overallSatisfaction: data.overallSatisfaction,
      recommendationLikelihood: data.recommendationLikelihood,
      additionalComments: data.additionalComments
    });
  }
});
}

  submit() {
    this.submitted = true;
    if (this.Form.invalid) return;

    const payload = {
      ...this.Form.value,
      id: this.id || 0,
      mrn: localStorage.getItem('mrn') || '',
      visitId: this.Form.get('visitId')?.value || this.visitId || '',
    };

    this.spinner.show();

    this.content.addUpdateSatisfaction(payload).subscribe(
      response => {
        this.spinner.hide();
        if (response.isSuccess) {
          this.toasterService.success(` ${this.isEditMode ? 'updated' : 'added'} successfully.`);
          this.router.navigate(['/visit']);
        } else {
          this.toasterService.error(response.messages);
        }
      },
      error => {
        this.spinner.hide();

      }
    );
  }

  setRating(controlName: string, rating: number) {
    this.Form.get(controlName)?.setValue(rating);
  }

  // setRating(field: number, value: number) {
  //   if (field === 1) this.rating1 = value;
  //   else if (field === 2) this.rating2 = value;
  //   else if (field === 3) this.rating3 = value;
  // }

  rate(rating: number) {
    this.selectedRating = rating;
    console.log("Rated:", rating);
  }
 backClicked() {
   this._location.back();
 }

}