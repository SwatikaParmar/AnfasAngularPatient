import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history-chat',
  templateUrl: './history-chat.component.html',
  styleUrls: ['./history-chat.component.css']
})
export class HistoryChatComponent {
  senderId: string = '';
  receiverId: string = '';
  chatHistory: any[] = [];
  rootUrl: any;
  dummyImage: string = 'assets/images/DummyImage.jpg';
  senderName: any;
  receiverName: any;
  newMessage: string = '';

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
    second: '2-digit',
    hour12: true,
  };

  return utcDateObj.toLocaleString('en-US', options); // Convert to local time
}

sendMessage(): void {
  // Ensure the message content is not empty
  if (!this.newMessage.trim()) {
    this.toaster.warning('Message cannot be empty!');
    return;
  }

  // Construct the payload with a formatted timestamp
  const payload = {
    senderUserName: this.senderId,  // The sender's ID
    id: 0,  // ID can be dynamically assigned if necessary
    receiverUserName: this.receiverId,  // The receiver's ID
    messageContent: this.newMessage.trim(),  // The content of the message
    messageType: '',  // Message type (you can adjust this based on your needs)
    timestamp: this.getCurrentLocalDateTime()  // Get the timestamp in ISO format
  };

  this.spinner.show();  // Show loading spinner while sending

  // Make the service call to send the message
  this.contentService.sendMessage(payload).subscribe(
    (response) => {
      this.spinner.hide();  // Hide loading spinner once response is received

      // Check if the response is successful
      if (response.isSuccess) {
        // Optionally, add the sent message to the chat history
        const newMessage = {
          senderUserName: this.senderId,
          receiverUserName: this.receiverId,
          messageContent: payload.messageContent,
          messageType: payload.messageType,
          timestamp: payload.timestamp  // Use the ISO timestamp
        };
        this.chatHistory.push(newMessage);  // Add message to chat history
        this.newMessage = '';  // Clear the input field
      } else {
        // Show error message if something goes wrong
        this.toaster.error(response.messages || 'Failed to send message');
      }
    },
    (error) => {
      // Hide the spinner and show an error message if there's an issue with the request
      this.spinner.hide();
      this.toaster.error('Error sending message');
    }
  );
}


getCurrentLocalDateTime(): string {
  const now = new Date();
  return now.toISOString();  // Return timestamp in ISO format: "2025-04-25T05:54:42.447Z"
}


}

