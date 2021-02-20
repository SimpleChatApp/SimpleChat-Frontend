import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import * as Sentry from '@sentry/angular';
import { environment } from 'src/environments/environment';
import { IDType } from '../types/id-type';
import { QueryParamModel } from '../models/query-param-model';
import { MessageDialogService } from './message-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<Key extends IDType> {

  protected path = '';

  constructor(protected http: HttpClient,
              protected msg: MessageDialogService) {
  }

  protected convertIDToString(value: Key): string {
    if (typeof (value) === 'string') {
      return value as string;
    }
    if (typeof (value) === 'number') {
      return (value as number).toString();
    }

    return '';
  }
}
