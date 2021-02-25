import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationDataModel } from 'src/app/authentication/models/authentication-data-model';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { AuthState } from 'src/app/authentication/state/auth-reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public title: string;
  public showNavbar: boolean;
  public userName: string;

  private authDataSubscription: Subscription;

  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.title = environment.TITLE;
    this.authDataSubscription = new Subscription();
    this.userName = '';
    this.showNavbar = false;
  }

  ngOnInit(): void {
    this.authDataSubscription = this.authService.authenticationData
      .subscribe((state: AuthState) => {
        if (state && state.IsAuthenticated) {
          this.showNavbar = true;
          this.userName = state.Data.displayName;
        } else {
          this.showNavbar = false;
          this.userName = '';
        }
    });
  }

  ngOnDestroy(): void{
    this.authDataSubscription.unsubscribe();
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate([environment.APP_ROUTES.auth.login]);
  }

}
