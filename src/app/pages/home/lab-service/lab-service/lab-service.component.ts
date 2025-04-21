import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lab-service',
  templateUrl: './lab-service.component.html',
  styleUrls: ['./lab-service.component.css']
})
export class LabServiceComponent {
  spaList: any;                                                                    
  page: number = 0;                                                                                                                                                                                             
  itemsPerPage!: number;
  totalItems!: number;
  productList: any;
rootUrl: any;


  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
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

