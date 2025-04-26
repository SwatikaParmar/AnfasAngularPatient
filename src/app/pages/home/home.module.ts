import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { VisitListComponent } from './visit/visit-list/visit-list.component';
import { ComplaintListComponent } from './complaint/complaint-list/complaint-list.component';
import { SatisfactionFormComponent } from './satisfaction/satisfaction-form/satisfaction-form.component';
import { AboutUsComponent } from './about/about-us/about-us.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { DoctorDetailComponent } from './doctor/doctor-detail/doctor-detail.component';
import { PatientProfileComponent } from './profile/patient-profile/patient-profile.component';
import { PatientConsentComponent } from './profile/patient-consent/patient-consent.component';
import { BookAppointmentComponent } from './appointment/book-appointment/book-appointment.component';
import { EditConsentComponent } from './profile/edit-consent/edit-consent.component';
import { MessageChatComponent } from './messages/message-chat/message-chat.component';
import { ComplaintChatComponent } from './complaint/complaint-chat/complaint-chat.component';
import { ComplaintFormComponent } from './complaint/complaint-form/complaint-form.component';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HistoryListComponent } from 'src/app/history/history-list/history-list.component';
import { HistoryChatComponent } from 'src/app/history/history-list/history-chat/history-chat.component';



// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    HomeComponent,
    VisitListComponent,
    ComplaintListComponent,
    SatisfactionFormComponent,
    AboutUsComponent,
    MessagesListComponent,
    AppointmentListComponent,
    DoctorListComponent,
    DoctorDetailComponent,
    PatientProfileComponent,
    PatientConsentComponent,
    BookAppointmentComponent,
    EditConsentComponent,
    MessageChatComponent,
    ComplaintChatComponent,
    ComplaintFormComponent,
    HistoryListComponent,
    HistoryChatComponent
   
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FormsModule,
    AngularEditorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: []
})
export class HomeModule { }
