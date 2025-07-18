import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
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
   languageMode: string = '1';
  constructor(
    private toastrService: ToastrService,
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
        private spinner: NgxSpinnerService,
    
  ){  const role = localStorage.getItem('languageMode'); // or however you store it
    if (role === '2') {
      this.languageMode = '2';
    } else {
      this.languageMode = '1';
    }}
  

  ngOnInit(): void {
    this.getAbout();
  }

  getAbout(){
    this.spinner.show();
    this.contentService.aboutUs().subscribe(
      (response) => {
        if (response.status ) {
          this.spinner.hide();
          this.aboutUsContent = this.sanitizer.bypassSecurityTrustHtml(response.data.data);
        }
      },
      (error) => {
      this.spinner.hide();
       
      }
    );
  }

 
}


