import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { AuthenticationDataModel } from '../models/authentication-data-model';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  public authenticationData$: Observable<AuthenticationDataModel>;

  private authenticationDataSubject: Subject<any>;

  private authData: AuthenticationDataModel | null = null;

  constructor(
    protected http: HttpClient) {
      super(http);
      this.authenticationDataSubject = new Subject<AuthenticationDataModel>();
      this.authenticationData$ = this.authenticationDataSubject.asObservable();
  }

  public login(loginModel: LoginModel): Observable<boolean> {

    this.authData = {} as AuthenticationDataModel;
    this.authenticationDataSubject.next(this.authData);

    const reqHeaders = new HttpHeaders({ 'dont-authenticate': '', 'dont-cache': '' });

    return of(true);
  }

  public logout(): void {
    this.authData = null;
    this.authenticationDataSubject.next(null);
  }

  // private loadUser(): void {
  //   if (this.authData) {
  //     this.userService.getById(this.authData.id).subscribe(user => {
  //       if (user) {
  //         this.currentUserSubject.next(user as User);
  //       }
  //     });
  //   }
  // }

  private handleHttpError(error: HttpErrorResponse): Observable<boolean> {
    console.log(error);
    return of(false);
  }
}
