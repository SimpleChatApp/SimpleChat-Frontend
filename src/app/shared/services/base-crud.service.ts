import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AddModel } from '../models/add-model';
import { APIResultModel } from '../models/api-result-model';
import { BaseModel } from '../models/base-model';
import { UpdateModel } from '../models/update-model';
import { BaseService } from './base.service';
import { IDType } from '../types/id-type';
import { environment } from 'src/environments/environment';
import { MessageDialogService } from './message-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class BaseCRUDService<
  A extends AddModel<Key>,
  U extends UpdateModel<Key>,
  L extends BaseModel<Key>,
  Key extends IDType> extends BaseService<Key> {

  constructor(protected http: HttpClient,
              protected msg: MessageDialogService) {
    super(http, msg);
  }

  public getAll(): Observable<L[]> {
      return this.http.get<L[]>(this.path)
        .pipe(map((data: L[]) => data),
            catchError(this.handleError)
        );
  }

  public getById(id: Key): Observable<APIResultModel<Key> | L>{
    return this.http.get<APIResultModel<Key> | L>(this.path + '/' + this.convertIDToString(id))
      .pipe(tap(data => data),
          catchError(this.handleError)
      );
  }

  public add(model: A): Observable<APIResultModel<Key>>{
    return this.http.post<APIResultModel<Key>>(this.path, model)
      .pipe(
          catchError(this.handleError)
      );
  }

  public update(model: U): Observable<APIResultModel<Key>>{
    const url = `${this.path}/${this.convertIDToString(model.id)}`;

    return this.http.put<APIResultModel<Key>>(url, model)
      .pipe(
          catchError(this.handleError)
      );
  }

  public Delete(id: Key): Observable<void>{
    const url = `${this.path}/${this.convertIDToString(id)}`;

    return this.http.delete<void>(url)
      .pipe(
          catchError(this.handleError)
      );
  }
}
