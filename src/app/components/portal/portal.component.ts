﻿import { Component, OnInit, OnDestroy, SecurityContext } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { UserService, AuthenticationService } from '../../services';
import { faMapSigns } from '@fortawesome/pro-solid-svg-icons';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { phoneNumberValidator } from '../../validators/phone-validator';
import { parse, format, AsYouType } from 'libphonenumber-js';


@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.scss']
})

export class PortalComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    faMapSigns = faMapSigns;
    users: User[] = [];
    i18n: I18n;
    contactForm: FormGroup;
    AsYouType: any;

    // Validation Messages
    account_validation_messages = {
        'username': [
            { type: 'required', message: 'Username is required' },
            { type: 'minlength', message: 'Username must be at least 5 characters long' },
            { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Your username must contain only numbers and letters' },
            { type: 'validUsername', message: 'Your username has already been taken' }
        ],
        'email': [
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', message: 'Enter a valid email' }
        ],
        'phone': [
            { type: 'required', message: 'Phone number is required' },
        ],
        'confirm_password': [
            { type: 'required', message: 'Confirm password is required' },
            { type: 'areEqual', message: 'Password mismatch' }
        ],
        'password': [
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'Password must be at least 5 characters long' },
            { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
        ],
        'terms': [
            { type: 'pattern', message: 'You must accept terms and conditions' }
        ]
    };

    // Array of apps to loop through, styles associated with Sass map on portal.component.scss
    apps: any = [
        {
            link: '/user-type',
            styleName: 'srw',
            icon: ['fas', 'train'], // 'fqts', 'train08'
            fullName: 'SmartRail Web',
            isSubscribed: true,
        },
        {
            link: '/test/blah',
            styleName: 'data-exchange',
            icon: ['fas', 'database'],
            fullName: 'Data Exchange Terminal and EDI Router',
            isSubscribed: true,
        },
        {
            link: '/test/blah',
            styleName: 'demurrage',
            icon: ['fas', 'clock'],
            fullName: 'Demurrage',
            isSubscribed: true,
        },
        {
            link: '/test/blah',
            styleName: 'detention',
            icon: ['fas', 'box-usd'], // 'fqts', 'tanker-money'
            fullName: 'Detention',
            isSubscribed: true,
        },
        {
            link: '/test/blah',
            styleName: 'equipment-maint',
            icon: ['fas', 'wrench'], // 'fqts', 'railcar-maintenance'
            fullName: 'Equipment Maintenance Manager',
            isSubscribed: true,
        },
        {
            link: '/test/blah',
            styleName: 'web-billing',
            icon: ['fas', 'file-invoice-dollar'],
            fullName: 'Web Billing',
            isSubscribed: true,
        },
        {
            link: '/test/blah',
            styleName: 'rate-manager',
            icon: ['fas', 'hand-holding-usd'],
            fullName: 'Rate Manager',
            isSubscribed: true,
        },
        {
            link: '/test/blah',
            styleName: 'customer-maint',
            icon: ['fas', 'users-cog'],
            fullName: 'Customer Maintenance',
            isSubscribed: true,
        },
        {
            link: '/reactive-demo',
            styleName: 'filler',
            icon: ['fas', 'users-cog'],
            fullName: 'ABC XYZ',
            isSubscribed: true,
        },
    ];

    constructor(
        i18n: I18n,
        sanitizer: DomSanitizer,
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) {
        this.contactForm = this.createFormGroup();
       /*  this.apps = this.apps.map((app: any) => ({
            link: app.link,
            styleName: app.styleName,
            icon: app.icon,
            fullName: sanitizer.sanitize(SecurityContext.HTML, app.fullName)
        })); */
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });

        /* new AsYouType('US').input('2133734444'); */
    }

    ngOnInit() {
        this.AsYouType = new AsYouType('US').input('2133734444');
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    createFormGroup() {
        return new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', [Validators.required, phoneNumberValidator]),
            username: new FormControl('', [
                Validators.required,
                Validators.maxLength(25),
                Validators.minLength(5),
                Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
            ])
        });
    }

    revert() {
        this.contactForm.reset();
    }

    onSubmit() {
        // ...
    }

    get username() {
        return this.contactForm.get('username');
    }

    get phone() {
        return this.contactForm.get('phone');
    }

    get email() {
        return this.contactForm.get('email');
    }


    /* createForms() {
        // user links form validations
        this.accountDetailsForm = this.fb.group({
        username: new FormControl('', Validators.compose([
         UsernameValidator.validUsername,
         Validators.maxLength(25),
         Validators.minLength(5),
         Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
         Validators.required
        ]))
      });
    } */

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    // Intro.js App Tour
    startTour() {
        const IntroJs = require('../../../../node_modules/intro.js/intro.js');
        const intro = IntroJs();

        // Initialize steps
        intro.setOptions({
            steps: [
                {
                    intro: '<h5>Welcome</h5> Welcome to your new Portal. We&apos;ll walk you through all of the new features.',
                    position: 'left'
                }, {
                    element: '#promoarea',
                    intro: 'Text here for the promo area.',
                    position: 'left'
                }, {
                    element: '#heading1',
                    intro: 'Description here for this id block.',
                    position: 'left'
                }, {
                    element: '#heading2',
                    intro: 'Self-contained area for the tour that doesn&apos;t belong to an id',
                    position: 'left'
                }
            ]
        });

        // Start tutorial
        intro.start();
    }
}
