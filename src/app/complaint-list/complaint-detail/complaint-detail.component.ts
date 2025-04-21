import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-complaint-detail',
  templateUrl: './complaint-detail.component.html',
  styleUrls: ['./complaint-detail.component.css']
})
export class ComplaintDetailComponent implements OnInit, OnDestroy {
  detail: any;
  rootUrl: any;
  complaintId: any;
  replies: any;
  newMessage!: string;
  pollingInterval: any;
  @ViewChild('chatbox', { static: false }) chatbox!: ElementRef;

  constructor(
    private contentService: ContentService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.complaintId = this.route.snapshot.params['id'];
    this.complaintDetail();
    this.complaintReply();

    // Start polling every 5 seconds to fetch new messages
    this.startPolling();
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to prevent memory leaks
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  // Start polling to fetch new messages
  startPolling(): void {
    this.pollingInterval = setInterval(() => {
      this.complaintReply(); // Check for new replies every 5 seconds
    }, 5000);
  }

  complaintDetail() {
    this.spinner.show();

    this.contentService.getComplaintDetails(this.complaintId).subscribe({
      next: (response) => {
        if (response.status) {
          this.detail = response.data;
        } else {
          this.toastrService.error(response.messages);
        }
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toastrService.error('An error occurred while fetching details.');
      }
    });
  }

  complaintReply(): void {
    this.spinner.show();
    const payload = {
      complaintId: this.complaintId,
      page: 1,
      pageSize: 10,
    };

    this.contentService.getComplaintReply(payload).subscribe(
      (response) => {
        this.spinner.hide();
        if (response.status) {
          // Check if the replies have changed, and update only if necessary
          this.replies = response.data.complaints[0].replies.map((reply: any) => ({
            ...reply,
            createdAt: this.convertToLocalTime(reply.createdAt), // Convert to local time
          }));
          if (this.chatbox) {
            this.scrollToChatbox();
          }
        }
      },
      (error) => {
        this.spinner.hide();
        this.toastrService.error('Error fetching complaint replies');
      }
    );
  }

  scrollToChatbox(): void {
    // Scroll to the chatbox element
    this.chatbox.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  // Convert UTC to Local Time
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
    if (!this.newMessage.trim()) {
      this.toastrService.warning('Message cannot be empty!');
      return;
    }

    const payload = {
      complaintReplyId: 0, // New reply
      complaintId: this.complaintId,
      description: this.newMessage.trim(),
      mrn: this.detail.mrn, // Replace with actual MRN
      role: 'Admin', // User role
    };

    this.spinner.show();

    this.contentService.complaintAddUpdate(payload).subscribe(
      (response) => {
        this.spinner.hide();
        if (response.status) {
          const newReply = {
            reply: payload.description,
            createdAt: this.getCurrentLocalDateTime(), // Use a local timestamp
            role: payload.role, // Use role from payload
          };

          // Add the new reply to the list of replies
          this.replies.push(newReply);
          this.newMessage = ''; // Clear input field
        } else {
          this.toastrService.error(response.message || 'Failed to send reply');
        }
      },
      (error) => {
        this.spinner.hide();
        this.toastrService.error('Error sending reply');
      }
    );
  }

  // Generate a timestamp in local time
  getCurrentLocalDateTime(): string {
    const now = new Date();
    return now.toLocaleString(); // Returns a human-readable local date-time string
  }

  backClicked() {
    this._location.back();
  }
}
