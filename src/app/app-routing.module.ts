import { Routes, RouterModule } from '@angular/router';

import { SubpageLayoutComponent } from './shared/components/subpage-layout/subpage-layout.component';
import { LoginComponent } from './components/login/login.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { ReactiveDemoComponent } from './components/reactive-demo/reactive-demo.component';
import { UserTypeComponent } from './components/user-type/user-type.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  // No Layout Routes
  {
    path: 'login',
    component: LoginComponent
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
      {
        path: 'myaccount',
        component: MyaccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'reactive-demo',
        component: ReactiveDemoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user-type',
        component: UserTypeComponent,
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
