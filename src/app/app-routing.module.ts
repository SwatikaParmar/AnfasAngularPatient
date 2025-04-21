import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/auths/not-found/not-found.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [  
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path: 'auth',
    loadChildren: () => import('./pages/auths/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  // {
  //   path: '404',
  //   component: NotFoundComponent,
  // },
  // { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, !environment.production ? { enableTracing: false, useHash: false, scrollPositionRestoration: 'enabled' } : { scrollPositionRestoration: 'enabled', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
