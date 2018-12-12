import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('main') main: ElementRef;
  currentUser: User;
  isOffcanvas = true;
  hasFirstName = true;

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

}
