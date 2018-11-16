import { Routes, RouterModule } from '@angular/router';

import { SubpageLayoutComponent } from './shared/components/subpage-layout/subpage-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  // No Layout Routes
  {
    path: 'login',
    component: LoginComponent
    /* children: [
      {
        path: 'login',
        loadChildren: './modules/login/login.module#LoginModule'
      },
    ] */
  },
  // Subpage routes with header and footer
 {
    path: '',
    component: SubpageLayoutComponent,
    children: [
      {
        path: 'portal',
        loadChildren: './modules/portal/portal.module#PortalModule',
        canActivate: [AuthGuard]
      },
    ]
  },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to login
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);
