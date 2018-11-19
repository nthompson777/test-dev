﻿import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './helpers';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { routing } from './app-routing.module';
import { SubpageLayoutComponent } from './shared/components/subpage-layout/subpage-layout.component';

import { CalloutMessageComponent } from './components/callout-message/callout-message.component';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';;
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NgxFoundationModule } from './shared/ngx-foundation.module';
import { MessageService } from './services/message.service';
import { DialogBodyComponent } from './shared/modal/dialog-body/dialog-body.component';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxFoundationModule,
        routing,
        FontAwesomeModule
    ],
    declarations: [
        AppComponent,
        CalloutMessageComponent,
        SubpageLayoutComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
        DialogBodyComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        MessageService,
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogBodyComponent,
    ]
})

export class AppModule { }