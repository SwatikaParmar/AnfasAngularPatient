import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-manage-language',
  templateUrl: './manage-language.component.html',
  styleUrls: ['./manage-language.component.css']
})
export class ManageLanguageComponent {
  manageForm!: FormGroup;
  postedData: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
   
  }




}

