import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [
  { path: 'maintenance', component: MaintenanceComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Lazy loaded modules
  { path: 'auth', loadChildren: () => import('./pages/auths/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },

  // ❌ Do NOT redirect ** to maintenance
  // { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, !environment.production ? { enableTracing: false, useHash: false, scrollPositionRestoration: 'enabled' } : { scrollPositionRestoration: 'enabled', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
