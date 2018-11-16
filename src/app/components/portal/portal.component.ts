import { Component, OnInit, OnDestroy, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { UserService, AuthenticationService } from '../../services';
import { faMapSigns } from '@fortawesome/pro-solid-svg-icons';

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

    // Array of apps to loop through, styles associated with Sass map on portal.component.scss
    apps: any = [
        {
            link: '/test/blah',
            styleName: 'srw',
            icon: ['fqts', 'train08'],
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
            icon: ['fqts', 'tanker-money'],
            fullName: 'Detention',
            isSubscribed: true,
        },
        {
            link: '/test/blah',
            styleName: 'equipment-maint',
            icon: ['fqts', 'railcar-maintenance'],
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
            link: '/test/blah',
            styleName: 'filler',
            icon: ['fas', 'users-cog'],
            fullName: 'ABC XYZ',
            isSubscribed: true,
        },
    ];

    constructor(
        sanitizer: DomSanitizer,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.apps = this.apps.map((app: any) => ({
            link: app.link,
            styleName: app.styleName,
            icon: app.icon,
            fullName: sanitizer.sanitize(SecurityContext.HTML, app.fullName)
        }));
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

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
                    element: '#powertools',
                    intro: 'Power Tools text here.',
                    position: 'left'
                }, {
                    element: '#heading1',
                    intro: 'Heading 1',
                    position: 'left'
                }, {
                    element: '#heading2',
                    intro: 'Heading 2',
                    position: 'left'
                }, {
                    element: document.querySelectorAll('.heading')[2],
                    intro: 'Heading 3.',
                    position: 'right'
                }
            ]
        });

        // Start tutorial
        intro.start();
    }
}
