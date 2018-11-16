import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-foundation/modal';
import { BsModalRef } from 'ngx-foundation/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../../services';
import { faUserLock } from '@fortawesome/pro-solid-svg-icons';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    recoverUserIDForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    modalRef: BsModalRef;
    faUserLock = faUserLock;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private modalService: BsModalService,
    ) {
        // redirect to portal if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['portal']);
        }
        // Add class 'login' to body for unique styling of Login Page
        document.body.className = 'login';
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'portal';
    }

    // Remove class 'login' from body when leaving Login Page
    ngOnDestroy(){
        document.body.className = '';
    }

    // Convenience getter for easy access to form fields
    get fLogin() { return this.loginForm.controls; }

    onSubmitLogin() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.fLogin.username.value, this.fLogin.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    get fRecover() { return this.recoverUserIDForm.controls; }

    onSubmitRecoverUserID() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.recoverUserIDForm.invalid) {
            return;
        }

        this.loading = true;
    }

    // Forgot User ID Modal
    openIdModal(forgotId: TemplateRef<any>) {
        this.modalRef = this.modalService.show(forgotId, {class: 'tiny'});
        this.recoverUserIDForm = this.formBuilder.group({
            recoverUserID: ['', Validators.required],
        });
    }

    // Forgot User ID Modal
    openPassModal(forgotPass: TemplateRef<any>) {
        this.modalRef = this.modalService.show(forgotPass, {class: 'tiny'});
    }

}
