import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { APIResultModel } from 'src/app/shared/models/api-result-model';
import { BaseService } from 'src/app/shared/services/base.service';
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service';
import { environment } from 'src/environments/environment';
import { AuthenticationDataModel } from '../models/authentication-data-model';
import { IsUserExistModel } from '../models/is-user-exist-model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService<string> {

  public authenticationData$: Observable<AuthenticationDataModel>;

  private authenticationDataSubject: Subject<any>;

  private authData: AuthenticationDataModel | null = null;

  constructor(protected http: HttpClient,
              protected msg: MessageDialogService) {
    super(http, msg);
    this.authenticationDataSubject = new Subject<AuthenticationDataModel>();
    this.authenticationData$ = this.authenticationDataSubject.asObservable();
  }

  public login(loginModel: LoginModel): Observable<boolean> {
    const reqHeaders = new HttpHeaders({ 'dont-authenticate': '', 'dont-cache': '' });

    return this.http.post<any>(environment.API_ROUTES.auth.createToken, loginModel,
      { headers: reqHeaders })
      .pipe(retry(3),
        map(data => {
          this.authData = data as AuthenticationDataModel;
          this.updateAuthDataSubject();

          return data;
        }), catchError(this.handleError));
  }

  public logout(): void {

    //revoke token

    this.authData = null;
    this.updateAuthDataSubject();
  }

  public register(model: RegisterModel): Observable<boolean> {
    const reqHeaders = new HttpHeaders({ 'dont-authenticate': '', 'dont-cache': '' });

    return this.http.post<any>(environment.API_ROUTES.auth.register, model,
      { headers: reqHeaders })
      .pipe(retry(3),
        map(data => {
          this.authData = data as AuthenticationDataModel;
          this.updateAuthDataSubject();

          return data;
        }), catchError(this.handleError));
  }

  public isUserExist(userName: string, eMail: string): Observable<any> {
    const reqHeaders = new HttpHeaders({ 'dont-authenticate': '', 'dont-cache': '' });
    const url = environment.API_ROUTES.auth.isUserExist
      .replace('{userName}', userName)
      .replace('{eMail}', eMail);

    return this.http.get<any>(url, { headers: reqHeaders })
      .pipe(retry(3),
        map(data => {

        console.log(data);

        return data;
      }), catchError(this.handleError));
  }

  // public refreshToken(): Observable<boolean> {

  // }

  private updateAuthDataSubject(): void {
    this.authenticationDataSubject.next(this.authData);
  }
}
