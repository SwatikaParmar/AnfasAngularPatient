import { Component } from '@angular/core';
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
  page: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 0;
  doctorList: any[] = [];
  rootUrl: any;
  searchTerm: string = '';
  selectedTab: string = 'All'; // ✅ Default tab

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1;
    });
    this.getDoctorList(); // ✅ initial load
  }

  // ✅ Fetch doctors list by DepartmentName (tab)
  getDoctorList(): void {
    this.spinner.show();

    const payload: any = {
      DepartmentName: this.selectedTab === 'All' ? '' : this.selectedTab
    };

    this.contentService.getDoctorss(payload).subscribe({
      next: (response: any) => {
        this.spinner.hide();
        if (response.status === true) {
          this.doctorList = response.data || [];
          this.totalItems = this.doctorList.length;
        } else {
          this.doctorList = [];
          this.totalItems = 0;
          this.toastrService.warning('No doctors found');
        }
      },
      error: () => {
        this.spinner.hide();
        this.toastrService.error('Error fetching doctor list');
      }
    });
  }

  // ✅ Handle Tab Change → Fetch data again
  onTabChange(tabName: string): void {
    if (this.selectedTab !== tabName) {
      this.selectedTab = tabName;
      this.page = 1;
      this.getDoctorList(); // ✅ fetch by department
    }
  }

  // ✅ Frontend Search & Pagination
  get filteredDoctorList() {
    let filtered = [...this.doctorList];

    // 🔍 Apply frontend search
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter((doc: any) =>
        doc.printName?.toLowerCase().includes(term)
      );
    }

    // 🔢 Calculate pagination
    this.totalItems = filtered.length;
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return filtered.slice(start, end);
  }

  // ✅ Pagination click
  onPageChange(page: number): void {
    this.page = page;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }

  // ✅ Book appointment
  edit(item: any): void {
    const CareProviderCode = item.code;
    const receiverName = item.printName;

    if (CareProviderCode && receiverName) {
      this.router.navigate(['/appointment-list/appointment/book'], {
        queryParams: { CareProviderCode, receiverName }
      });
    } else {
      this.toastrService.warning('Invalid doctor data');
    }
  }

  backClicked(): void {
    this._location.back();
  }
}
