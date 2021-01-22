import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationData } from '../models/authentication-data-model';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private authData: AuthenticationData;

    constructor(private authService: AuthenticationService,
                private router: Router) {
        this.authData = {} as AuthenticationData;
        this.authService.authenticationData$.subscribe(s => this.authData = s);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
            'Access-Control-Allow-Credentials': 'true'
        });

        if (!req.headers.has('dont-authenticate') && this.authData) {
            headers = headers.append('Authorization', 'Bearer ' + this.authData.tokenData.accessToken);
        }

        const modifiedRequest = req.clone({
            headers
        });

        return next.handle(modifiedRequest)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        if (event.status === 401) {

                            //refresh token request

                            this.authService.logout();
                            this.router.navigate(['/login']);
                        }
                    }
                })
            );
    }
}
