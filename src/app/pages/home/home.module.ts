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



// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    HomeComponent,
   
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FormsModule,
    AngularEditorModule,
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
