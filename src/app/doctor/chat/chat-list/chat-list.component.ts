import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
  data: any;
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
    constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
  ){ }

  ngOnInit(): void {
 this.getmessagePerson();
  }


  getmessagePerson(){
    
    const code = localStorage.getItem('code');

    this.contentService.getMessageList(code).subscribe(response => {

      if(response.isSuccess == true){
this.data = response.data;
      }else {

      }
    });
  }


    onPageChange(page: number): void {
        // Update query parameters for pagination
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: page },
          queryParamsHandling: 'merge',
        });
      }
    
      backClicked() {
        this._location.back();
      }  

}
