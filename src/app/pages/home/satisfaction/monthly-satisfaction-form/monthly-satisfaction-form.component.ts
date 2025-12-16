import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-monthly-satisfaction-form',
  templateUrl: './monthly-satisfaction-form.component.html',
  styleUrls: ['./monthly-satisfaction-form.component.css']
})
export class MonthlySatisfactionFormComponent {

  form!: FormGroup;
  data: any;
  ratingsTable: any[] = [];
  ratingScale: any;

  // Enums
  filledByOptions: any[] = [];
  genderOptions: any[] = [];
  residenceOptions: any[] = [];
  ageOptions: any[] = [];
  monthOptions: any[] = [];   // ⭐ NEW MONTH ENUM


  comments: any;
  visitId: any;
  id: any;
  isEditMode = false;
  rootUrl: string = environment.rootPathUrl;
  FALLBACK: any = null; // Optional fallback JSON
  selectedMonth!: number;   // ⭐ IMPORTANT
  yearOptions: any;

  constructor(
    private fb: FormBuilder,
    private content: ContentService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private languageService: LanguageSwitcherServiceService,
    private _location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Capture route query params
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.visitId = params['visitId'];
      this.isEditMode = !!this.id;
    });

    // Initialize form
    this.form = this.fb.group({
      name: [''],
      mrn: [''],
      mobileNumber: [''],
      filledBy: ['',Validators.required],
      gender: ['', Validators.required],
      residence: ['',Validators.required],
      code: ['', Validators.required],
        yearCode: ['', Validators.required],  // ⭐ ADD THIS

      ageBracket: ['',Validators.required],
      ratings: this.fb.group({}),
      comments: this.fb.group({
        C1: [''],
        C2: ['']
      }),
      visitId: [this.visitId]
    });

       // 🔥 LISTEN TO MONTH CHANGE
    this.form.get('code')?.valueChanges.subscribe(month => {
      if (month && month !== this.selectedMonth) {
        this.selectedMonth = month;
        this.loadDataByMonth(month);
      }
    });

this.form.get('yearCode')?.valueChanges.subscribe(year => {
  if (year) {
    this.loadDataByMonth(this.form.value.code);
  }
});

    this.loadInitialData();
  }

// ================= INITIAL LOAD =================
  loadInitialData() {
    const defaultMonth = 0; // backend default
    this.selectedMonth = defaultMonth;
    this.form.patchValue({ code: defaultMonth }, { emitEvent: false });
    this.loadDataByMonth(defaultMonth);
  }

  // ================= MONTH BASED LOAD =================
  loadDataByMonth(month: number) {
    const mrn = localStorage.getItem('mrn');
    if (!mrn) return;

    this.spinner.show();

this.content.getMonthlySatisfactionData(
  mrn,
  this.form.value.code,
  this.form.value.yearCode
)      .subscribe({
        next: (res) => {
          this.spinner.hide();
          if (res.isSuccess && res.data) {
            this.bindData(res.data);
          } else {
            this.toasterService.error('No data found for selected month');
          }
        },
        error: () => {
          this.spinner.hide();
          this.toasterService.error('Failed to load data');
        }
      });
  }

  // ================= BIND DATA =================
bindData(data: any) {
  this.data = data;
  const subj = data.subject;

  // ✅ PATCH MONTH ON FIRST LOAD ONLY
  if (!this.form.value.code && subj.code) {
    this.selectedMonth = subj.code;
    this.form.patchValue({ code: subj.code }, { emitEvent: false });
  }

  // Patch YEAR only once
if (!this.form.value.yearCode && data.subject?.yearCode) {
  this.form.patchValue(
    { yearCode: data.subject.yearCode },
    { emitEvent: false }
  );
}


  // PATCH REST (DO NOT TOUCH MONTH AGAIN)
  this.form.patchValue({
    name: subj.name,
    mrn: subj.mrn,
    mobileNumber: subj.mobileNumber,
    filledBy: subj.filledBy?.code,
    gender: subj.gender?.code,
    residence: subj.residence?.code,
    ageBracket: subj.ageBracket?.code,
    visitId: this.visitId
  }, { emitEvent: false });

  // ENUMS
  this.monthOptions = data.enums.month || [];
  this.yearOptions = data.enums.years || [];

  this.filledByOptions = data.enums.filledBy || [];
  this.genderOptions = data.enums.gender || [];
  this.residenceOptions = data.enums.residence || [];
  this.ageOptions = data.enums.ageBracket || [];

  // RATINGS
  this.ratingsTable = data.ratings.items || [];
  this.ratingScale = data.ratingScale || [];

  const ratingsGroup: any = {};
  this.ratingsTable.forEach(q => {
    ratingsGroup[q.key] = [q.value];
  });
  this.form.setControl('ratings', this.fb.group(ratingsGroup));

  // COMMENTS
  this.comments = data.comments.items || [];
  this.form.get('comments')?.patchValue({
    C1: this.comments.find((c: { key: string }) => c.key === 'C1')?.value || '',
    C2: this.comments.find((c: { key: string }) => c.key === 'C2')?.value || ''
  }, { emitEvent: false });
}



  getCommentLabel(key: string): string {
    return this.data?.comments?.items?.find((c: { key: string; }) => c.key === key)?.label || '';
  }

  get commentsFG(): FormGroup {
    return this.form.get('comments') as FormGroup;
  }

  exportJSON() {
    if (this.form.invalid) {
      this.toasterService.error('Please fill all required fields.');
      return;
    }
    debugger
    const ratings = this.ratingsTable.map(q => ({
      key: q.key,
      value: Number(this.form.get(['ratings', q.key])?.value || 0)
    }));

    const comments = [
      { key: 'C1', value: this.form.value.comments.C1 || '' },
      { key: 'C2', value: this.form.value.comments.C2 || '' }
    ];

    const submission = {
      id: this.data.subject.id,
      guestId: this.data.subject.id,
      filledBy: Number(this.form.value.filledBy || 0),
      name: this.form.value.name,
      visitId: this.visitId,
      mrn: this.form.value.mrn,
      mobileNumber: this.form.value.mobileNumber,
      gender: Number(this.form.value.gender || 0),
      ageBracket: Number(this.form.value.ageBracket || 0),
      residence: Number(this.form.value.residence || 0),
            code: Number(this.form.value.code),

      ratings,
      comments
    };
    debugger
    this.spinner.show();
    this.content.postSatisfactionMonth(submission).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        if (res.isSuccess) {
          this.toasterService.success('Form submitted successfully!');
          this.router.navigate(['/thank-you']); // or back to listing page
        } else {
          this.toasterService.error(res.message || 'Submission failed.');
        }
      },
      error: () => {
        this.spinner.hide();
        this.toasterService.error('Something went wrong.');
      }
    });
  }


  backClicked() {
    this._location.back();
  }
}
