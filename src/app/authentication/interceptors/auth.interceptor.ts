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
import { AuthenticationDataModel } from '../models/authentication-data-model';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private authData: AuthenticationDataModel;

    constructor(private authService: AuthenticationService,
                private router: Router) {
        this.authData = {} as AuthenticationDataModel;
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
                tap((event: any) => {
                    if (event instanceof HttpResponse) {
                        if (event.status === 401) {

                            // TODO: refresh token request

                            this.authService.logout();
                            this.router.navigate([environment.APP_ROUTES.auth.login]);
                        }
                    }
                })
            );
    }
}
