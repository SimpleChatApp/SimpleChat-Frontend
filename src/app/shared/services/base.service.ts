import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import * as Sentry from '@sentry/angular';
import { environment } from 'src/environments/environment';
import { IDType } from '../types/id-type';
import { QueryParamModel } from '../models/query-param-model';

@Injectable({
  providedIn: 'root'
})
export class BaseService<Key extends IDType> {

  protected path = '';

  constructor(protected http: HttpClient) {

}

  // protected insertParametersToPath(path: string, params: QueryParamModel[]): string{
  //   if (!path || path.length <= 0)
  //   {
  //     Sentry.captureException(throwError('URL_PATH is empty!'));
  //     return '';
  //   }

  //   path = path.trim();

  //   if (path.endsWith('/')) {
  //     path = path.substring(0, path.length - 1);
  //   }

  //   path = path + '?';

  //   params.forEach(param => {
  //     path = param.name + '=' + param.value + '&';
  //   });

  //   path = path.substring(0, path.length - 1);

  //   return path;
  // }

  protected convertIDToString(value: Key): string{
    if (typeof(value) === 'string') {
      return value as string;
    }
    if (typeof(value) === 'number') {
      return (value as number).toString();
    }

    return '';
  }

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
