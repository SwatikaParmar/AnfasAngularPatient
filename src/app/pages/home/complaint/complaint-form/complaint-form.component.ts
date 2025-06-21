import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css']
})
export class ComplaintFormComponent {
  complaintForm!: FormGroup;
  password: boolean = false;
  submitted = false;
  show = false;
  currentLanguage: string = 'en';

  currentLang: string = 'en'; // Default language
  typeList: any;
  showFeedbackTextarea = false;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private content: ContentService,
    private toasterService: ToastrService,
    private router: Router,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private languageService: LanguageSwitcherServiceService,
    private _location: Location,
  ) {
  
  }

  ngOnInit() {
    this.getComplaint();

    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
  
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.languageService.switchLanguage(this.currentLanguage);
    this.Form();
  }


  get f() {
    return this.complaintForm.controls;
  }                   

  Form() {
    this.complaintForm = this.formBuilder.group({
      complaint: this.formBuilder.group({
        complaintTypeId: [null, Validators.required],
        description: ['', Validators.required]
      }),
      feedbackDetails: this.formBuilder.group({
        enableFeedback: [false],
        feedback: ['']
      })
    });
  }

  getComplaint(){

    this.content.getComplaintType().subscribe(response => {
      if(response.status ===true) {
this.typeList = response.data;
      } else {

      }
    }
    )
  }

  get complaintTypeId() {
    return this.complaintForm.get('complaint.complaintTypeId');
  }
  
  get complaintDescription() {
    return this.complaintForm.get('complaint.description');
  }


  onToggleChange() {
    const feedbackCtrl = this.complaintForm.get('feedbackDetails.feedback');
    const isEnabled = this.complaintForm.get('feedbackDetails.enableFeedback')?.value;
  
    if (isEnabled) {
      feedbackCtrl?.enable();
    } else {
      feedbackCtrl?.disable();  // Optional: Disable when hidden
      feedbackCtrl?.reset();    // Optional: Clear textarea when unchecked
    }
  }
onSubmit() {
  debugger
  if (this.complaintForm.invalid) {
    this.complaintForm.markAllAsTouched(); 
    return;
  }

  this.spinner.show(); // 🔄 Show spinner

  const payload: any = {
    mrn: localStorage.getItem('mrn'),
    complaint: {
      complaintId: 0,
      complaintTypeId: this.complaintForm.get('complaint.complaintTypeId')!.value,
      description: this.complaintForm.get('complaint.description')!.value
    },
    feedbackDetails: null
  };

  const feedbackGroup = this.complaintForm.get('feedbackDetails')!;
  const enabled = feedbackGroup.get('enableFeedback')!.value;
  const feedbackText = feedbackGroup.get('feedback')!.value?.trim();

  if (enabled && feedbackText) {
    payload.feedbackDetails = { feedback: feedbackText };
  }

  this.content.addComplaint(payload).subscribe({
    next: (response) => {
      this.spinner.hide(); // ✅ Hide spinner on response

      if (response.status === true) {
        this.toasterService.success(response.message);
        this.router.navigateByUrl('/complaint');
      } else {
        this.toasterService.error(response.message);
      }
    },
    error: (err) => {
      this.spinner.hide(); // ✅ Hide spinner on error
      this.toasterService.error('Something went wrong.');
    }
  });
}

  backClicked() {
    this._location.back();
  }
}
