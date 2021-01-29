import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Sentry from '@sentry/angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';

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
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module for toaster
    ToastrModule.forRoot(),
    HttpClientModule,
    AuthenticationModule,
    SharedModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: environment.TITLE +  ' App DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
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
