import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LayoutsComponent } from 'src/app/layouts/layouts.component';
import { DashboardComponent } from './Dashbord/dashboard/dashboard.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { DoctorAddComponent } from './doctor-list/doctor-add/doctor-add.component';
import { DoctorListComponent } from './doctor-list/doctor-list/doctor-list.component';
import { DoctorEditComponent } from './doctor-list/doctor-edit/doctor-edit.component';
import { DoctorDetailsComponent } from './doctor-list/doctor-details/doctor-details.component';
import { PatientsListComponent } from './patients-list/patients-list/patients-list.component';
import { AppointmentListComponent } from './appointment-list/appointment-list/appointment-list.component';
import { AppointmentDetailsComponent } from './appointment-list/appointment-details/appointment-details.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

import { LabServiceComponent } from './lab-service/lab-service/lab-service.component';
import { EditLabServiceComponent } from './lab-service/edit-lab-service/edit-lab-service.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BannerListComponent } from 'src/app/banner-list/banner-list.component';
import { BannerAddComponent } from 'src/app/banner-list/banner-add/banner-add.component';
import { BannerDetailComponent } from 'src/app/banner-list/banner-detail/banner-detail.component';
import { PatientsDetailComponent } from './patients-list/patients-detail/patients-detail.component';
import { PatientsAddComponent } from './patients-list/patients-add/patients-add.component';
import { VisitDetailComponent } from 'src/app/visit-detail/visit-detail.component';
import { GetconsentformComponent } from 'src/app/getconsentform/getconsentform.component';
import { ComplaintListComponent } from 'src/app/complaint-list/complaint-list.component';
import { FeedbackComponent } from 'src/app/feedback/feedback.component';
import { ComplaintDetailComponent } from 'src/app/complaint-list/complaint-detail/complaint-detail.component';
import { SatisfactionSurveyComponent } from 'src/app/Satisfaction/satisfaction-survey/satisfaction-survey.component';
import { SurveyDataComponent } from 'src/app/Satisfaction/survey-data/survey-data.component';

const routes: Routes = [
        
  {
    path: '',
    component: LayoutsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'terms&Conditions', component: TermsAndConditionsComponent },
      { path: 'home', component: HomeComponent },
      { path: 'doctors-list/doctors-add', component: DoctorAddComponent },
      { path: 'doctors-list', component: DoctorListComponent },
      { path: 'doctors-list/doctor-add/:id', component: DoctorAddComponent},
      { path: 'doctors-list/doctor-details', component: DoctorDetailsComponent },
      { path: 'doctor-details/:id', component: DoctorDetailsComponent },
      { path: 'patients-list', component: PatientsListComponent },
      { path: 'patients-list/patients-detail', component: PatientsDetailComponent },
      { path: 'patients-list/patients-add', component: PatientsAddComponent },  
      { path: 'appointment-list', component: AppointmentListComponent },
      { path: 'appointment-list/appointment-detail/:id/:id2', component: AppointmentDetailsComponent },
      { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'about-us', component: AboutusComponent },
      { path: 'lab-service', component: LabServiceComponent },
      { path: 'lab-service/edit/:id', component: EditLabServiceComponent },  
      { path: 'banner-list', component: BannerListComponent },  
      { path: 'banner-list/banner-detail/:id', component: BannerDetailComponent },
      { path: 'banner-list/banner-add', component: BannerAddComponent },  
      { path: 'banner-list/banner-update', component: BannerAddComponent },  
      { path: 'patients-list/visit-detail', component: VisitDetailComponent },  
      { path: 'patients-list/consentForm', component: GetconsentformComponent},  
      { path: 'complaint-list', component: ComplaintListComponent},  
      { path: 'complaint-list/complaint-detail/:id', component: ComplaintDetailComponent},  
      { path: 'feedback-list', component: FeedbackComponent},  
      { path: 'satisfaction-survey', component:SatisfactionSurveyComponent},
      { path: 'satisfaction-survey/data/:id', component:SurveyDataComponent}


    
    ]
  } 
];

@NgModule({    
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
