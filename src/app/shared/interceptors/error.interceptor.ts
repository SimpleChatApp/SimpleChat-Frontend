import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as Sentry from '@sentry/angular';
import { MessageDialogService } from '../services/message-dialog.service';
import { ErrorMessageService } from '../services/error-message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(protected msg: MessageDialogService,
              protected messages: ErrorMessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(retry(3), catchError(err => {

      Sentry.captureException(err);

      this.msg.showError(this.messages.getByName('GeneralErrorHeader'), this.messages.getByName('GeneralErrorDescription'));

      return EMPTY;
    }));
  }
}
