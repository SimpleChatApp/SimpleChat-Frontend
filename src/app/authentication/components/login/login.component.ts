import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginModel } from '../../models/login.model';
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service';
import { AuthenticationDataModel } from '../../models/authentication-data-model';
import { environment } from 'src/environments/environment';
import { AuthState } from '../../state/auth-reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isSending = false;

  private subscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private msg: MessageDialogService) {
      this.loginForm = new FormGroup({});
      this.subscription = new Subscription();
    }

  ngOnInit(): void {
    this.subscription = this.authService.authenticationData.subscribe((state: AuthState) => {
      if (state && state.IsAuthenticated) {
        // TODO: create a guard, if user data exist redirect to home screen
        this.router.navigate([environment.APP_ROUTES.baseUrl]);
      }
    });

    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    this.isSending = true;

    if (this.loginForm.valid) {
      const data = (this.loginForm.value as LoginModel);

      data.userName = data.userName.replace(/\s/g, '');
      data.password = data.password.replace(/\s/g, '');

      this.authService.login(data).subscribe((result: boolean) => {
        if (result) {
          this.router.navigate([environment.APP_ROUTES.baseUrl]);
        } else {
          this.msg.showError('Error!', 'Username or password is not correct!');
        }
      });
    } else {
      this.msg.showWarning('Warning!', 'The login form isn\'t valid!');
    }

    this.isSending = false;
  }

  public redirectToRegister(): void{
    this.router.navigate([environment.APP_ROUTES.auth.register]);
  }
}
