import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  doctorList: any;
  rootUrl: any;
  searchTerm: string = '';  // Search term for filtering doctors
  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
  ){ }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.doctorLists();  
  }
  
  doctorLists() {


    this.contentService.getDoctors().subscribe(
      response => {
        if (response.status === true) {
          this.doctorList = response.data;
        } else {
        
        }
      },
      error => {
       
      }
    );
  }    

  get filteredDoctorList() {
    if (!this.doctorList || this.doctorList.length === 0) {
      return [];
    }
    return this.doctorList.filter((doctor: any) =>
      doctor.printName.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  
  editContent(item: any): void {
    this.router.navigate(['/doctors-list/doctor-details'], {
      queryParams: {
        OrgCode: item?.OrgCode || 'AMC',  // Default to 'AMC' if not provided
        ShowInPatientPortal: item?.ShowInPatientPortal !== undefined ? item?.ShowInPatientPortal : true,  // Default to true if not provided
        loginid: item?.loginId  // Ensure this is passed correctly
      }
    });
  }
  
  backClicked() {
    this._location.back();
  }
  

  edit(item: any): void {
    
    const CareProviderCode = item.code;
    const receiverName = item.printName;
  
    if (CareProviderCode && receiverName) {
      this.router.navigate(['/appointment-list/appointment/book'], {
        queryParams: {
          CareProviderCode,
          receiverName
        }
      });
    } else {
   
    }
  }
}
