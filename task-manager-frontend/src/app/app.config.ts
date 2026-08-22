import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors as withHttpInterceptors } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // provideClientHydration(), // Retiré pour éviter d'attendre la réponse du serveur
    provideHttpClient(
      withHttpInterceptors([authInterceptor])
    ),

   provideTranslateService({
  lang: 'es',
  fallbackLang: 'es',
  loader: provideTranslateHttpLoader({
    prefix: '/assets/i18n/',
    suffix: '.json'
  })
})
  ]
};