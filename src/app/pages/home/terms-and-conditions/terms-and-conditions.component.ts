import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      { name: 'quote', class: 'quote' },
      { name: 'redText', class: 'redText' },
      { name: 'titleText', class: 'titleText', tag: 'h1' },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  termsAndConditionForm!: FormGroup;
  Id: string = '';
  currentLanguage: string = '';
  currentLanguageMode: number = 0; // Store the current language mode

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private contentService: ContentService,
    private spinner: NgxSpinnerService,
    private languageService: LanguageSwitcherServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.termsAndConditionForm = this.formBuilder.group({
      termsCondition: ['']
    });

    // Subscribe to language changes
    this.languageService.language$.subscribe(language => {
      this.currentLanguage = language;
    });

    this.languageService.languageMode$.subscribe(languageMode => {
      this.currentLanguageMode = languageMode; // Store the latest language mode
      this.fetchtermsConditions(languageMode);
  //    this.updateLayoutDirection(languageMode);
    });
  }

  updateLayoutDirection(languageMode: number) {
    document.documentElement.dir = languageMode === 2 ? 'rtl' : 'ltr';
  }

  fetchtermsConditions(languageMode: number): void {
    this.contentService.termsAndConditions(languageMode).subscribe(
      (response) => {
        if (response.status) {
          this.Id = response.data.id;
  
          // ✅ Use raw HTML string directly
          this.termsAndConditionForm.patchValue({
            termsCondition: response.data.data
          });
        }
      },
      (error) => {
        console.error('Error fetching terms and conditions:', error);
        this.toastr.error('Failed to load terms and conditions content.');
      }
    );
  }
  


  submit(): void {
    if (this.termsAndConditionForm.invalid) {
      alert('Please fill out the Terms and Conditions field.');
      return;
    }

    const termsCondition = this.termsAndConditionForm.value.termsCondition;

    this.contentService.updateTermsAndConditons(termsCondition).subscribe(
      response => {
        debugger
        if (response.status == true) {
          alert('Terms and Conditions updated successfully!');
          this.termsAndConditionForm.reset(); // Optionally reset the form
        } else {
          alert('Failed to update Terms and Conditions.');
        }
      },
      error => {
        console.error('Full Error Object:', error);
        alert('An unexpected error occurred.');
    }
    
    );
  }
}
