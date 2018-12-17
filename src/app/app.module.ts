import { NgModule, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend - Remove once we hook into AD Global
import { fakeBackendProvider } from './helpers';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { routing } from './app-routing.module';
import { SubpageLayoutComponent } from './shared/components/subpage-layout/subpage-layout.component';

import { CalloutMessageComponent } from './components/callout-message/callout-message.component';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MainNavComponent } from './shared/components/main-nav/main-nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NgxFoundationModule } from './shared/ngx-foundation.module';
import { MessageService } from './services/message.service';
import { DialogBodyComponent } from './shared/modal/dialog-body/dialog-body.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';

// Import the service
import { I18n, MISSING_TRANSLATION_STRATEGY } from '@ngx-translate/i18n-polyfill';
declare const require; // Use the require method provided by webpack
export const translations = require(`raw-loader!../locale/messages.es.xlf`);

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
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
        MainNavComponent,
        FooterComponent,
        DialogBodyComponent,
        MyaccountComponent
    ],
    providers: [
        {provide: TRANSLATIONS, useValue: translations},
        {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
        {provide: LOCALE_ID, useValue: 'es'},
        {provide: MISSING_TRANSLATION_STRATEGY, useValue: MissingTranslationStrategy.Ignore},
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        MessageService,
        I18n,
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogBodyComponent,
    ]
})

export class AppModule { }
