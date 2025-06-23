import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { SafeHtml } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent {
  aboutUsContent: any;
termsForm!:FormGroup;
termsText!: SafeHtml;
  languageMode: string = '1';
constructor(
      private fb: FormBuilder,

    private toastrService: ToastrService,
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
        private spinner: NgxSpinnerService,
    
  ){

      this.termsForm = this.fb.group({
      termsText: ['']  // form control to hold your terms HTML
    });
     const role = localStorage.getItem('languageMode'); // or however you store it
    if (role === '2') {
      this.languageMode = '2';
    } else {
      this.languageMode = '1';
    }

   }

   ngOnInit(): void {
    this.getterms();
  }
getterms() {
  this.spinner.show();
  this.contentService.terms().subscribe(
    (response: string) => {
      this.spinner.hide();
      this.termsText = this.sanitizer.bypassSecurityTrustHtml(response);
    },
    (error) => {
      this.spinner.hide();
     
    
    }
  );
}


  
}
