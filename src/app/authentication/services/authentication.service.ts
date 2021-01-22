import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthenticationData } from '../models/authentication-data-model';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authenticationData$: Observable<AuthenticationData>;

  private authenticationDataSubject: BehaviorSubject<any>;

  private authData: AuthenticationData | null = null;

  constructor(
    private http: HttpClient) {
    this.authenticationDataSubject = new BehaviorSubject<AuthenticationData>({} as AuthenticationData);
    this.authenticationData$ = this.authenticationDataSubject.asObservable();
  }

  public login(loginModel: LoginModel): Observable<boolean> {

    this.authData = {} as AuthenticationData;
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
