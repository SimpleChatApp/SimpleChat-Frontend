import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import * as Sentry from '@sentry/angular';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected http: HttpClient) { }

  protected handleError(error: HttpErrorResponse): Observable<never>{
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
      Sentry.captureException(error);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
      Sentry.captureException(error);
    }
    // return an observable with a user-facing error message
    return throwError('');
  }
}
