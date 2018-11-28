import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { UserService, AuthenticationService } from '../../services';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe (user => {
        this.currentUser = user;
      });
    }
}
