import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as Sentry from '@sentry/angular';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Modules
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './authentication/interceptors/auth.interceptor';
import { CacheInterceptor } from './shared/interceptors/cache.interceptor';
import { LogInterceptor } from './shared/interceptors/log.interceptor';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
    { provide: ErrorHandler, useValue: Sentry.createErrorHandler({ showDialog: true }) },
    { provide: Sentry.TraceService, deps: [Router]},
    { provide: APP_INITIALIZER, useFactory: () => () => {}, deps: [Sentry.TraceService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
