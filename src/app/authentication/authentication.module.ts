import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgottenPasswordComponent,
    EmailVerificationComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
