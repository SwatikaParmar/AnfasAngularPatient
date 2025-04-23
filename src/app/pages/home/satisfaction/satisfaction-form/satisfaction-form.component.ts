import { Component } from '@angular/core';

@Component({
  selector: 'app-satisfaction-form',
  templateUrl: './satisfaction-form.component.html',
  styleUrls: ['./satisfaction-form.component.css']
  
})
export class SatisfactionFormComponent {
  selectedRating = 0;
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