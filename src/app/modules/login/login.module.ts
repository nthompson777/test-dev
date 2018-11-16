import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';
import { LoginRoutingModule } from '../../modules/login/login-routing.module';
import { AlertModule, ModalModule } from 'ngx-foundation';
import { CalloutMessageComponent } from '../../components/callout-message/callout-message.component';
import { DialogBodyComponent } from '../../shared/modal/dialog-body/dialog-body.component';

@NgModule({
  declarations: [
    LoginComponent,
    CalloutMessageComponent,
    DialogBodyComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
  ],
  entryComponents: [
    DialogBodyComponent,
  ]
})
export class LoginModule { }
