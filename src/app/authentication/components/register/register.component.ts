import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service';
import { GenericValidator } from 'src/app/shared/utils/generic-validator';
import { environment } from 'src/environments/environment';
import { AuthenticationDataModel } from '../../models/authentication-data-model';
import { RegisterModel } from '../../models/register-model';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthState } from '../../state/auth-reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public isSending: boolean;

  private subscription: Subscription;

  constructor(private authService: AuthenticationService,
              private fb: FormBuilder,
              private router: Router,
              private msg: MessageDialogService) {
      this.registerForm = new FormGroup({});
      this.subscription = new Subscription();
      this.isSending = false;
  }

  ngOnInit(): void{
    this.subscription = this.authService.authenticationData.subscribe((state: AuthState) => {
      if (state && state.IsAuthenticated) {
        // TODO: create a guard, if user data exist redirect to home screen
        this.router.navigate([environment.APP_ROUTES.baseUrl]);
      }
    });

    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8),
        Validators.maxLength(100),
        GenericValidator.mustHaveAlphaNumericChar(),
        GenericValidator.mustHaveDigit(),
        GenericValidator.mustHaveUpperCase(),
        GenericValidator.mustHaveSymbol()]],
      confirmPassword: ['', [Validators.required]],
      displayName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      about: ['', [ Validators.maxLength(500)]],
      email: ['', [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200),
        Validators.email]]
    },  { validator: GenericValidator.mustMatch('password', 'confirmPassword') });
  }

  onSubmit(): void{
    this.isSending = true;

    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      const data = (this.registerForm.value as RegisterModel);

      this.authService.isUserExist(data.userName, data.email).subscribe(response => {

        console.log(response);

        if (!response) {
          this.msg.showError('Something went wrong :(', 'Please try again.');
        }

      });

    } else {
      this.isSending = false;
      this.msg.showWarning('Form values invalid!', 'Please check the form.');
      return;
    }

    //if user exist, show msg

    //if the user not exist send register request

    //on success load the home page
    //if any error, parse the error en show


  }

  returnBack(): void{
    this.router.navigate([environment.APP_ROUTES.auth.login]);
  }
}
