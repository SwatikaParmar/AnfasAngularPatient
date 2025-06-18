import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complaint-chat',
  templateUrl: './complaint-chat.component.html',
  styleUrls: ['./complaint-chat.component.css']
})
export class ComplaintChatComponent {
  rootUrl: any;
  complaintId: any;
  replies: any;
  newMessage!: string;
  complaintDetails: any;
 

  constructor(
    private contentService: ContentService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private _location: Location,
  ) {}

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.complaintId = this.route.snapshot.params['id'];

   if (history.state.complaintData) {
    this.complaintDetails = history.state.complaintData;
  } else {
    this.fetchComplaintDetails(); // Add this method
  }
    this.complaintReply();

   
  }


  fetchComplaintDetails(): void {
  const mrn = localStorage.getItem('mrn');
  const payload = {
    mrn,
    page: 1,
    pageSize: 1000
  };

  this.contentService.getComplaint(payload).subscribe(
    (response) => {
      if (response.status && response.data?.complaints?.length) {
        this.complaintDetails = response.data.complaints.find(
          (c: any) => c.complaintId == this.complaintId
        );
      }
    },
    (error) => {
      this.toastrService.error('Failed to load complaint details');
    }
  );
}
  complaintReply(): void {
    this.spinner.show();  // Show loading spinner
    const payload = {
      complaintId: this.complaintId,  // Pass the complaintId
      page: 1,                        // You can adjust the page number as needed
      pageSize: 10                    // You can adjust the pageSize (number of items per page)
    };
  
    this.contentService.getComplaintReply(payload).subscribe(
      (response) => {
        this.spinner.hide();  // Hide loading spinner
        if (response.status) {
          // Process the replies
          this.replies = response.data.complaints[0].replies.map((reply: any) => ({
            ...reply,
            createdAt: this.convertToLocalTime(reply.createdAt), // Convert to local time
          }));
        }
      },
      (error) => {
        this.spinner.hide();  // Hide loading spinner in case of error
        this.toastrService.error('Error fetching complaint replies');
      }
    );
  }
  

  // Convert UTC to Local Time
  convertToLocalTime(utcDate: string): string {
    if (!utcDate) return 'Invalid Date';  // Handle missing dates
  
    const utcDateObj = new Date(utcDate + 'Z');  // Treat as UTC time
    if (isNaN(utcDateObj.getTime())) return 'Invalid Date';  // Handle invalid date
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,  // Optional, for 12-hour format
    };
  
    return utcDateObj.toLocaleString('en-US', options);  // Convert to local time
  }
  

  sendMessage(): void {
    // Check if the message is not empty
    if (!this.newMessage.trim()) {
      this.toastrService.warning('Message cannot be empty!');
      return;
    }
  
    // Retrieve MRN (Medical Record Number) from localStorage
    const mrn = localStorage.getItem('mrn');
    
    // Define the payload for the complaint reply
    const payload = {
      complaintReplyId: 0, // New reply (since it's not being updated)
      complaintId: this.complaintId, // The current complaint ID
      description: this.newMessage.trim(), // The reply message
      mrn: mrn, // Medical record number (assuming this is needed for identification)
      role: 'Patient', // User role (assuming this is admin)
    };
  
    // Show the spinner while sending the reply
    this.spinner.show();
  
    // Make the API call to add or update the complaint reply
    this.contentService.complaintAddUpdate(payload).subscribe(
      (response) => {
        // Hide the spinner after the response is received
        this.spinner.hide();
  
        // Check if the response is successful
        if (response.status) {
          // Prepare the new reply data to be added to the list of replies
          const newReply = {
            reply: payload.description,
            createdAt: this.getCurrentLocalDateTime(), // Generate current local timestamp
            role: payload.role, // The role from the payload (admin)
          };
  
          // Add the new reply to the list of replies
          this.replies.push(newReply);
  
          // Clear the input field after sending the reply
          this.newMessage = '';
        } else {
          // Handle the case where the reply was not added successfully
          this.toastrService.error(response.message || 'Failed to send reply');
        }
      },
      (error) => {
        // Hide the spinner and show an error message in case of an error
        this.spinner.hide();
        this.toastrService.error('Error sending reply');
      }
    );
  }
  
  // Function to get the current local date and time
  getCurrentLocalDateTime(): string {
    const now = new Date();
    return now.toLocaleString(); // Returns a human-readable local date-time string
  }
  

  backClicked() {
    this._location.back();
  }
}

