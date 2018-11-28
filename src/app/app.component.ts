import { Component,ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
    @ViewChild('main') main: ElementRef;
    currentUser: User;

    constructor(
        private renderer: Renderer,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    skipLink() {
        this.renderer.invokeElementMethod(this.main.nativeElement, 'focus');
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
