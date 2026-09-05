import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  // Exclure les fichiers de traduction i18n
  if (req.url.includes('/assets/i18n/')) {
    return next(req);
  }

  let authReq = req;

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
  }

  return next(authReq).pipe(
    timeout(4000),
    catchError((error: HttpErrorResponse) => {
      // Si le backend renvoie une erreur 401 ou 403 (Token expiré/invalide)
      if ((error.status === 401 || error.status === 403) && isPlatformBrowser(platformId)) {
        localStorage.removeItem('token');
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};