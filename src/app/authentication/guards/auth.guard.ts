import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationDataModel } from '../models/authentication-data-model';
import { AuthenticationService } from '../services/authentication.service';
import { AuthState } from '../state/auth-reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authData: AuthState | undefined;

  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.authService.authenticationData.subscribe((s: AuthState) => {
      if (s && s.Data) {
          this.authData = s;
      }
    });
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authData && this.authData.IsAuthenticated) {
        return true;
    }

    this.router.navigate([environment.APP_ROUTES.auth.login]);
    return false;
  }
}
