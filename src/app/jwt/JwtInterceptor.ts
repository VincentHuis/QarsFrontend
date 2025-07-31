// src/app/jwt/jwt.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../service/AuthService';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const jwt = auth.getToken();

  if (jwt) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${jwt}` }
    });
  }
  return next(req);
};
