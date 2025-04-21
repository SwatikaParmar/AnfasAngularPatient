import { Component, NgZone } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from "@angular/common";

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent {
  form!: FormGroup;
  doctorDetails: any;
  doctorId: any;
  isLoaded = false;
  appStatusId: any;
  dropdownSettings = {};
  Id: any;
  doctorReq: any;
  doctorstateid: any;
  doctorcountryId: any;
  doctordegreeid: any;
  doctorspecializationid: any;
  doctorlanguageid: any;

  /** Crop image */
  imageChangedEvent: any = "";
  profilePic: any = "";
  imgCropped: any;
  categorycroppedImage: boolean = false;
  submitted: boolean = false;
  showImages: any;
  modalService: any;
  croppedImage: any = "";
  rootUrl: any;
  doctorImg: any;
  specializationListData: any[] = [];
  languagesListData: any[] = [];
  degreeListData: any[] = [];
  stateListData: string[] = [];
  countryListData: string[] = [];
  degreeList: any;
  specializationList: any;
  languagesList: any;

  constructor(
    private contentService: ContentService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private _location: Location,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.EditForm();
    this.rootUrl = environment.rootPathUrl;
    this.doctorId = this.route.snapshot.paramMap.get("id");
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      allowSearchFilter: false,
      itemsShowLimit: 5,
      idField: "item_id",
      textField: "item_text",
    };
    this.spinner.show();
  }

  EditForm() {
    this.form = this.formBuilder.group({
      id: [""],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      genderId: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      dateOfBirth: ["", [Validators.required]],
      experience: ["", [Validators.required]],
      dialCode: ["", [Validators.required]],
      medicalRegistrationNumber: ["", [Validators.required]],
      countryId: ["", [Validators.required]],
      stateId: ["", [Validators.required]],
      city: [""],
      address: [""],
      degreeId: [""],
      doctorLanguage: [""],
      doctorSpecialization: [""],
      about: [""],
      profilePic: [""],
    });
  }



  setFormValues(data: any) {
    this.form.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      genderId: data.genderId,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth,
      experience: data.experience,
      dialCode: data.dialCode,
      medicalRegistrationNumber: data.medicalRegistrationNumber,
      city: data.city,
      countryId: this.countryListData,
      stateId: this.stateListData,
      address: data.address,
      degreeId: this.degreeListData,
      doctorLanguage: this.languagesListData,
      doctorSpecialization: this.specializationListData,
      profilePic: data.profilePic,
    });
  } 

  backClicked() {
    this._location.back();
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  get f() {
    return this.form["controls"];
  }

  cancel() {
    this.router.navigate(["/home/"], { relativeTo: this.route });

  }
}

