import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LayoutsComponent } from 'src/app/layouts/layouts.component';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';


const routes: Routes = [
        
  {
    path: '',
    component: LayoutsComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'home', component: HomeComponent },
    
    ]
  } 
];

@NgModule({    
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
