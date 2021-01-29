// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { GenerateAPIRoutes } from './api-endpoints';
import { GenerateAppRoutes } from './app-routes';
import { secureEnvironment } from './environment-secure';

export const environment = {
    production: false,
    API_PATH: secureEnvironment.API_PATH,
    SENTRY_DSN: secureEnvironment.SENTRY_DSN,
    API_VER: secureEnvironment.API_VER,
    TITLE: 'Simple Chat',
    API_ROUTES: GenerateAPIRoutes(secureEnvironment.API_PATH),
    APP_ROUTES: GenerateAppRoutes()
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
