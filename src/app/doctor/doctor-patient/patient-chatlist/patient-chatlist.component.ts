import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-chatlist',
  templateUrl: './patient-chatlist.component.html',
  styleUrls: ['./patient-chatlist.component.css']
})
export class PatientChatlistComponent {
 senderId: string = '';
  receiverId: string = '';
  chatHistory: any[] = [];
  rootUrl: any;
  dummyImage: string = 'assets/images/DummyImage.jpg';
  senderName: any;
  receiverName: any;
  newMessage: string = '';
  receiverLastName:any;
  lastName!: string | null;
  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private _location: Location,
    private spinner :NgxSpinnerService,
    private toaster : ToastrService
  ) {}

  
  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParamMap.subscribe(params => {
      this.senderId = params.get('senderId') || '';
      this.receiverId = params.get('receiverId') || '';
      this.receiverName = params.get('receiverName') || 'Unknown Receiver';
      this.lastName = params.get('lastName');
      this.loadChatHistory();
    });
  }
  
 loadChatHistory(): void {
  if (!this.senderId || !this.receiverId) {
    return;
  }

  this.contentService.getChatHistory(this.senderId, this.receiverId).subscribe(
    (response) => {
      if (response.isSuccess) {
        this.chatHistory = response.data.messages.map((message: { timestamp: string }) => ({
          ...message,
          timestamp: this.convertToLocalTime(message.timestamp)
        }));
        
      

      } 
    }
  );
}

 backClicked() {
   this._location.back();
 }


 convertToLocalTime(utcDate: string): string {
  if (!utcDate) return 'Invalid Date'; // Handle missing dates

  const utcDateObj = new Date(utcDate + 'Z'); // Ensure it's treated as UTC
  if (isNaN(utcDateObj.getTime())) return 'Invalid Date'; // Handle invalid date

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return utcDateObj.toLocaleString('en-US', options); // Convert to local time
}

sendMessage(): void {
  if (!this.newMessage.trim()) {
    this.toaster.warning('Message cannot be empty!');
    return;
  }

  const payload = {
    senderUserName: this.senderId,
    id: 0,
    receiverUserName: this.receiverId,
    messageContent: this.newMessage.trim(),
    messageType: '',
    timestamp: this.getCurrentLocalDateTime()
  };

  this.spinner.show();

  this.contentService.sendMessage(payload).subscribe(
    (response) => {
      this.spinner.hide();

      if (response.isSuccess) {
        const newMessage = {
          senderUserName: this.senderId,
          receiverUserName: this.receiverId,
          messageContent: payload.messageContent,
          messageType: payload.messageType,
          timestamp: this.convertToLocalTime(payload.timestamp)
        };
        this.chatHistory.push(newMessage);
        this.newMessage = '';
      } else {
        // ✅ Show only backend message
        this.toaster.error(response.messages);
      }
    },
    (error) => {
      this.spinner.hide();
      // ✅ If backend sends a message in error response
      this.toaster.error(error?.error?.messages || 'Unexpected error occurred.');
    }
  );
}


getCurrentLocalDateTime(): string {
  const now = new Date();
  return now.toISOString();  // Return timestamp in ISO format: "2025-04-25T05:54:42.447Z"
}


}
