
import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent {
  loginForm!: FormGroup;
  submitted: boolean = false;
  doctorForm!: FormGroup;
  currentLanguage: string = 'en';

  constructor(
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private zone: NgZone,
    private router: Router,
    private toasterService: ToastrService,
    private _location: Location,
    private languageService: LanguageSwitcherServiceService
  ) { }

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      genderId: [null],
      email: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      dateOfBirth: [''],
      experience: [null],
      degreeId: [''],
      doctorSpecialization: [''],
      doctorLanguage: [''],
      medicalRegistrationNumber: [''],
      city: [''],
      stateId: [null],
      countryId: [null],
      address: [''],
      about: [''],
      uploadPhoto: [''],
    });
  }
  backClicked() {
    this._location.back();
  }

  get f() { return this.doctorForm['controls']; }

  onItemSelect(item: any) { }
  onSelectAll(items: any) { }
}
