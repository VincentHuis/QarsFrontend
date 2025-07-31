// src/app/core/role.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../service/AuthService';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'] || [];
    const userRoles = this.auth.getRoles();       // bv. ["ROLE_USER"]

    const normalizedUserRoles = userRoles.map(r =>
      r.startsWith('ROLE_') ? r.substring(5) : r
    );


    const hasRole = expectedRoles.some(r => normalizedUserRoles.includes(r));
    if (!hasRole) {
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }
}
