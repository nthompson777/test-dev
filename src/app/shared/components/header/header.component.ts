import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../models/user';
import { faToolbox, faUserCircle, faSignOutAlt } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser: User;
  isOffcanvas = true;
  hasFirstName = true;
  faToolbox = faToolbox;
  faUserCircle = faUserCircle;
  faSignOutAlt = faSignOutAlt;


  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

}
