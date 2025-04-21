import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
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
  aboutusForm: FormGroup;
  privacy: any;
  aboutUs: any;
  Id: string = '';

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private languageService: LanguageSwitcherServiceService,
    private contentService: ContentService,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) {
    this.aboutusForm = this.formBuilder.group({
      aboutUs: [''], 
      privacyPolicy: [''],
      termsCondition: ['']
    });
  }

  ngOnInit(): void {
    this.languageService.languageMode$.subscribe(languageMode => {
      this.fetchAboutUs(languageMode);
    });
  }


  fetchAboutUs(languageMode: number): void {
    this.contentService.aboutUs().subscribe(
      (response) => {
        if (response.status === true) {
          this.Id = response.id;
  
          // PATCH PLAIN HTML STRING (DO NOT SANITIZE)
          this.aboutusForm.patchValue({
            aboutUs: response.data.data
          });
        }
      },
      (error) => {
        console.error('Error fetching About us content:', error);
      }
    );
  }
  


  submit(event: Event) {
    event.preventDefault(); 
    
    this.spinner.show();
    let payload = {
      id: this.Id,
      aboutUs: this.aboutusForm.value.aboutUs,
      privacyPolicy: null,
      termsCondition: null
    };
  
  
    this.contentService.updateAboutUs(payload).subscribe(response => {
      this.spinner.hide();
      if (response.status == true) {
        this.toastr.success(response.messages,'success');
      } else {
        this.toastr.error('An error occurred while updating.');
      }
    });
  }

}