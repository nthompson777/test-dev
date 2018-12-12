import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { UserService, AuthenticationService } from '../../services';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
  basicInfoForm: FormGroup;
  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe (user => {
        this.currentUser = user;
      });
    }

  onSubmit() { this.submitted = true; }

  ngOnInit() {
    this.basicInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get basicInfoFormG() { return this.basicInfoForm.controls; }



}
