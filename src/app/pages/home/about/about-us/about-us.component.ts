import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  aboutusForm!: FormGroup;
  Id: string = '';
  terms:any;
  aboutUsContent: any;
  
  constructor(
    private toastrService: ToastrService,
    private contentService: ContentService,
    private sanitizer: DomSanitizer
  ){ }
  

  ngOnInit(): void {
    this.getAbout();
  }

  getAbout(){
    this.contentService.aboutUs().subscribe(
      (response) => {
        if (response.status ) {
          this.aboutUsContent = this.sanitizer.bypassSecurityTrustHtml(response.data.data);
        }
      },
      (error) => {
      
        this.toastrService.error('Failed to load terms and conditions content.');
      }
    );
  }

 
}


