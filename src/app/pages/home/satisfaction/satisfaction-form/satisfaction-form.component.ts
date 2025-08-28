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
  selector: 'app-satisfaction-form',
  templateUrl: './satisfaction-form.component.html',
  styleUrls: ['./satisfaction-form.component.css']
})
export class SatisfactionFormComponent implements OnInit {

  form!: FormGroup;
  data: any;
  ratingsTable: any[] = [];
  ratingScale: any;

  // Enums
  filledByOptions: any[] = [];
  genderOptions: any[] = [];
  residenceOptions: any[] = [];
  ageOptions: any[] = [];

  comments: any;
  visitId: any;
  id: any;
  isEditMode = false;
  rootUrl: string = environment.rootPathUrl;
  FALLBACK: any = null; // Optional fallback JSON

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
      ageBracket: ['',Validators.required],
      ratings: this.fb.group({}),
      comments: this.fb.group({
        C1: [''],
        C2: ['']
      }),
      visitId: [this.visitId]
    });

    this.loadData();
  }

  loadData() {
    this.content.getSatisfactionForm(localStorage.getItem('mrn')).subscribe(response => {
      if (response.isSuccess && response.data) {
        this.data = response.data; // ✅ Store the data for later use (like exportJSON)

        const subj = this.data.subject;
        debugger
        // Patch guest info
        this.form.patchValue({
          name: subj.name || '',
          mrn: subj.mrn || '',
          mobileNumber: subj.mobileNumber || '',
          filledBy: subj.filledBy?.code || '',
          gender: subj.gender?.code || '',
          residence: subj.residence?.code || '',
          ageBracket: subj.ageBracket?.code || '',
          visitId: this.visitId || ''
        });

        // Populate Enums
        this.filledByOptions = this.data.enums.filledBy || [];
        this.genderOptions = this.data.enums.gender || [];
        this.residenceOptions = this.data.enums.residence || [];
        this.ageOptions = this.data.enums.ageBracket || [];

        // Ratings Table
        this.ratingsTable = this.data.ratings.items || [];
        this.ratingScale = this.data.ratingScale || [];

        // Build FormGroup for ratings dynamically with existing values
        const ratingsGroup: any = {};
        this.ratingsTable.forEach(q => {
          ratingsGroup[q.key] = [q.value !== null ? q.value : null];
        });
        this.form.setControl('ratings', this.fb.group(ratingsGroup));

        this.comments = this.data.comments.items || [];

        this.form.get('comments')?.patchValue({
          C1: this.comments.find((c: { key: string; }) => c.key === 'C1')?.value || '',
          C2: this.comments.find((c: { key: string; }) => c.key === 'C2')?.value || ''
        });

      }
    });
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
      ratings,
      comments
    };
    debugger
    this.spinner.show();
    this.content.postSatisfaction(submission).subscribe({
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
