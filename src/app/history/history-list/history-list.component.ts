import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;

  rootUrl: any;

  historyListOriginal: any[] = []; // the full original list
  historyList: any[] = [];         // the filtered list
  selectedStatus: string = 'All';  // dropdown selection
  

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
    this.appointment();  
  }
  
  appointment() {
    this.contentService.getAppointment(localStorage.getItem('mrn')).subscribe(
      response => {
        if (response.status === true) {
          this.historyListOriginal = response.data; // <- store original
          this.historyList = [...this.historyListOriginal]; // <- copy for display
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
  

  onPageChange(page: number): void {
    // Update query parameters for pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }

  
 
  filterHistoryList() {
    if (this.selectedStatus === 'All' || !this.selectedStatus) {
      this.historyList = [...this.historyListOriginal];
    } else {
      this.historyList = this.historyListOriginal.filter(item =>
        item.slots[0]?.statusUid?.valueDescription === this.selectedStatus
      );
    }
  }
  
  editContent(item: any): void {
    const senderId = localStorage.getItem('mrn'); // senderId comes from localStorage
    const slot = item.slots; // Get the first slot from the array
  
    if (!slot || !item.careProviderUid) {
      this.toastrService.error('Invalid appointment slot or provider data.');
      return;
    }
  
    const receiverId = item.careProviderUid.code; // Doctor code as receiverId
    const receiverName = item.careProviderUid.name; // Doctor's name as receiverName
  
    if (senderId && receiverId) {
      this.router.navigate(['/history-list/chat'], {
        queryParams: {
          senderId: senderId,
          receiverId: receiverId,
          receiverName: receiverName
        }
      });
    } else {
      this.toastrService.error('Invalid sender or receiver information.');
    }
  }
  
  
}
