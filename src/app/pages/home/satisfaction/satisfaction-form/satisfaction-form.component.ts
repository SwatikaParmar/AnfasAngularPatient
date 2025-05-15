import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-satisfaction-form',
  templateUrl: './satisfaction-form.component.html',
  styleUrls: ['./satisfaction-form.component.css']
  
})
export class SatisfactionFormComponent {
 Form!: FormGroup;
  submitted = false;
  rootUrl: any;
  selectedRating = 0;

  selectedRatings: { [key: string]: number } = {};
  id: any;
  constructor(
    private fb: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.rootUrl = environment.rootPathUrl;
    this.id = this.route.snapshot.paramMap.get('id');

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


}
export class CardRatingComponent {
  rating1 = 0;
  rating2 = 1; // prefilled like in your image
  rating3 = 0;
  selectedRating = 0;

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