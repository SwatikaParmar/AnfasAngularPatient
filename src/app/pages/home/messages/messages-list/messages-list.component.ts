import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  messageList: any;
  rootUrl: any;

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.messageLists();  
  }
  
  messageLists() {

    const userName = localStorage.getItem('mrn');
      this.contentService.getMessagesList(userName).subscribe(
        response => {
          if (response.isSuccess === true) {
            // Assuming the response data contains the user's first name
            this.messageList = response.data.map((user: { firstName: any; }) => ({
              ...user,
              firstName: user.firstName || 'Unknown'  // Add firstName here
            }));
          } else {
       
          }
        },
        error => {
       
        }
      );
    }      
    editContent(item: any): void {
      const senderId = localStorage.getItem('mrn'); // senderId comes from localStorage
      const receiverId = item.userName; // receiverId comes from the clicked item
      const receiverName = item.firstName; // Assuming the firstName is included in the list
      const receiverlastName = item.lastName;
    
      if (senderId && receiverId) {
        this.router.navigate(['/messages/chat'], {
          queryParams: {
            senderId: senderId,
            receiverId: receiverId,
            receiverName: receiverName, // Pass receiver's first name
            receiverlastName: receiverlastName
          }
        });
      } else {
       
      }
    }
    
    

    onPageChange(page: number): void {
      // Update query parameters for pagination
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: page },
        queryParamsHandling: 'merge',
      });
    }
}