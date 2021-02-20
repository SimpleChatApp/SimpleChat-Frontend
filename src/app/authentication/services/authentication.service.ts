import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
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
import * as AppState from 'src/app/state/app-state';
import * as AuthActions from '../state/auth-actions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService<string> {

  public authenticationData: Observable<AuthenticationDataModel>;

  constructor(protected http: HttpClient,
              protected msg: MessageDialogService,
              protected store: Store<AppState.State>) {
    super(http, msg);
    this.authenticationData = this.store.select(AppState.AuthKey);
  }

  public login(loginModel: LoginModel): Observable<boolean> {
    const reqHeaders = new HttpHeaders({ 'dont-authenticate': '', 'dont-cache': '' });

    return this.http.post<any>(environment.API_ROUTES.auth.createToken, loginModel,
      { headers: reqHeaders })
      .pipe(map(data => {
          this.store.dispatch(new AuthActions.SetAuthData(data as AuthenticationDataModel));

          return data; // true veya false donsun
        }));
  }

  public logout(): void {

    //revoke token

    this.store.dispatch(new AuthActions.ClearAuthData());
  }

  public register(model: RegisterModel): Observable<boolean> {
    const reqHeaders = new HttpHeaders({ 'dont-authenticate': '', 'dont-cache': '' });

    return this.http.post<any>(environment.API_ROUTES.auth.register, model,
      { headers: reqHeaders })
      .pipe(map(data => {
          this.store.dispatch(new AuthActions.SetAuthData(data as AuthenticationDataModel));

          return data; // true veya false donsun
        }));
  }

  public isUserExist(userName: string, eMail: string): Observable<any> {
    const reqHeaders = new HttpHeaders({ 'dont-authenticate': '', 'dont-cache': '' });
    const url = environment.API_ROUTES.auth.isUserExist
      .replace('{userName}', userName)
      .replace('{eMail}', eMail);

    return this.http.get<any>(url, { headers: reqHeaders });
  }

  // public refreshToken(): Observable<boolean> {

  // }
}
