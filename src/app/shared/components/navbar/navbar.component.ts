import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthenticationDataModel } from 'src/app/authentication/models/authentication-data-model';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
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
    this.title = environment.Title;
    this.authDataSubscription = new Subscription();
    this.userName = '';
    this.showNavbar = false;
  }

  ngOnInit(): void {
    this.authDataSubscription = this.authService.authenticationData$.subscribe((data: AuthenticationDataModel) => {
      if (!data) {
        this.showNavbar = false;
        this.userName = '';
      } else {
        this.showNavbar = true;
        this.userName = data.displayName;
      }
    });
  }

  ngOnDestroy(): void{
    this.authDataSubscription.unsubscribe();
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
