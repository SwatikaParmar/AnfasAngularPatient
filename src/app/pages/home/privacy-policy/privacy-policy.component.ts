import { Component, OnInit, TemplateRef } from "@angular/core";
import {FormBuilder, FormGroup, UntypedFormBuilder,UntypedFormGroup,Validators,} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { NgxSpinnerService } from "ngx-spinner";
import { ContentService } from "src/app/shared/services/content.service";
import { LanguageSwitcherServiceService } from "src/app/shared/services/language-switcher.service.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.css"],
})
export class PrivacyPolicyComponent implements OnInit {
   editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "0",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    uploadUrl: "v1/image",
    //upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]],
  };
  privacyForm: FormGroup;
  privacy: any;
  currentLanguage: string = 'en';
  privacyPolicyContent: any;
  Id: string = '';
  

  constructor(   private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private contentService: ContentService,
    private languageService: LanguageSwitcherServiceService,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer

  ) {
      this.privacyForm = this.formBuilder.group({
        aboutUs: [''], 
        privacyPolicy: [''],
        termsCondition: ['']
      });
     }
     ngOnInit(): void {
      // Subscribe to language changes
      this.languageService.language$.subscribe(language => {
        this.currentLanguage = language;
      });
  
      // Set initial language
      this.currentLanguage = localStorage.getItem('language') || 'en';
      this.languageService.switchLanguage(this.currentLanguage);
  
      // Fetch and apply layout direction based on language mode
      this.languageService.languageMode$.subscribe(languageMode => {
        this.fetchPrivacyPolicy(languageMode);
        this.updateLayoutDirection(languageMode);
      });
    }
  
    updateLayoutDirection(languageMode: number) {
      document.documentElement.dir = languageMode === 2 ? 'rtl' : 'ltr';
    }
  
  
    fetchPrivacyPolicy(languageMode: number): void {
      this.contentService.privacy().subscribe(
        (response) => {
          if (response.status === true) {
            this.Id = response.id;
    
            // ✅ Use plain HTML string for form input
            this.privacyForm.patchValue({
              privacyPolicy: response.data.data
            });
          }
        },
        (error) => {
          console.error('Error fetching Privacy Policy content:', error);
        }
      );
    }
    

  submit(event: Event) {
    event.preventDefault(); 
    
    this.spinner.show();
  
    let payload = {
      id: this.Id,
      privacyPolicy: this.privacyForm.value.privacyPolicy,
      aboutUs: null,
      termsConditions: null
    };
    
  
    this.contentService.privacyUpdate(payload).subscribe(response => {
      this.spinner.hide();
      if (response.status == true) {
        this.toastr.success(response.messages,'success');
      } else {
        this.toastr.error('An error occurred while updating.');
      }
    });        
  }


}
