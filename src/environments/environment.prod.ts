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
