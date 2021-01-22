import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AddModel } from '../models/add-model';
import { APIResultModel } from '../models/api-result-model';
import { BaseModel } from '../models/base-model';
import { QueryParamModel } from '../models/query-param-model';
import { UpdateModel } from '../models/update-model';
import { BaseService } from './base.service';
import * as Sentry from '@sentry/angular';
import { IDType } from '../types/id-type';

@Injectable({
  providedIn: 'root'
})
export class BaseCRUDService<
  A extends AddModel<Key>,
  U extends UpdateModel<Key>,
  L extends BaseModel<Key>,
  Key extends IDType> extends BaseService {

  constructor(protected http: HttpClient,
              protected controllerName: string) {
    super(http);
  }

  public getAll(): Observable<L[]> {
      return this.http.get<L[]>(this.getPath())
        .pipe(map((data: L[]) => data),
            catchError(this.handleError)
        );
  }

  public getById(id: Key): Observable<APIResultModel<Key> | L>{
    return this.http.get<APIResultModel<Key> | L>(this.getPath() + '/' + this.convertIDToString(id))
      .pipe(tap(data => data),
          catchError(this.handleError)
      );
  }

  public add(model: A): Observable<APIResultModel<Key>>{
    return this.http.post<APIResultModel<Key>>(this.getPath(), model)
      .pipe(
          catchError(this.handleError)
      );
  }

  public update(model: U): Observable<APIResultModel<Key>>{
    const url = this.insertParametersToPath(this.getPath(),
      [{ name: 'id', value: this.convertIDToString(model.id) } as QueryParamModel]);

    return this.http.put<APIResultModel<Key>>(url, model)
      .pipe(
          catchError(this.handleError)
      );
  }

  public Delete(id: Key): Observable<void>{
    const url = this.insertParametersToPath(this.getPath(),
    [{ name: 'id', value: this.convertIDToString(id) } as QueryParamModel]);

    return this.http.delete<void>(url)
      .pipe(
          catchError(this.handleError)
      );
  }

  protected getPath(): string{
    return environment.API_PATH + '/' + this.controllerName;
  }

  protected insertParametersToPath(path: string, params: QueryParamModel[]): string{
    if (!path || path.length <= 0)
    {
      Sentry.captureException(throwError('URL_PATH is empty!'));
      return '';
    }

    path = path.trim();

    if (path.endsWith('/')) {
      path = path.substring(0, path.length - 1);
    }

    path = path + '?';

    params.forEach(param => {
      path = param.name + '=' + param.value + '&';
    });

    path = path.substring(0, path.length - 1);

    return path;
  }

  protected convertIDToString(value: Key): string{
    if (typeof(value) === 'string') {
      return value as string;
    }
    if (typeof(value) === 'number') {
      return (value as number).toString();
    }

    return '';
  }


}
