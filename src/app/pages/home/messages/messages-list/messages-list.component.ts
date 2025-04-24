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
      debugger
    this.contentService.getMessagesList(userName).subscribe(
      response => {
        if (response.isSuccess === true) {
          this.messageList = response.data;
        } else {
          this.toastrService.error('Failed to fetch doctor list.');
          console.error('API returned failure:', response);
        }
      },
      error => {
        this.toastrService.error('Error fetching doctor list.');
        console.error('Error fetching doctor list:', error);
      }
    );
  }    
}