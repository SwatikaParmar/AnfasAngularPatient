import { Component } from '@angular/core';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  selectedTime: string = 'morning';

constructor(){}

ngoninit(){

}

  selectTime(time: string) {
    this.selectedTime = time;
  }
}
