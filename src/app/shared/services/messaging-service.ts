import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { BehaviorSubject } from "rxjs";


@Injectable()
export class MessagingService {
    
    currentMessage = new BehaviorSubject<any>(null);

    constructor(private angularfireMessaging: AngularFireMessaging) { }

requestPermission() {
  debugger
  this.angularfireMessaging.requestToken.subscribe(
    (token: any) => {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        console.warn('No FCM token received');
      }
    },
    (err) => {
      console.error('Unable to get FCM token', err);
    }
  );
}


    receiveMessaging() {
        
        this.angularfireMessaging.messages.subscribe((payload) => {

            this.currentMessage.next(payload)
        });
    }

}