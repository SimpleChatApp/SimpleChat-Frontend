import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgottenPassword', component: ForgottenPasswordComponent },
  { path: 'changePassword', component: PasswordChangeComponent },
  { path: 'emailVerification', component: EmailVerificationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
