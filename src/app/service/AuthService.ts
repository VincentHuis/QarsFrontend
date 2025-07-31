// src/app/core/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';

  constructor(
    private cookie: CookieService,
    private router: Router
  ) {}

  saveToken(token: string) {
    this.cookie.set(this.tokenKey, token, { path: '/', sameSite: 'Lax' });
  }

  getToken(): string {
    return this.cookie.get(this.tokenKey) || '';
  }

  clearToken() {
    this.cookie.delete(this.tokenKey, '/');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles || [];
    } catch {
      return [];
    }
  }

  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }
}
