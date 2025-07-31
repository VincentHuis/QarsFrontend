import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { AccessDeniedComponent } from './access-denied-component/access-denied-component';
import { AuthGuard } from './core/AuthGuard';
import { RoleGuard } from './core/RoleGuard';
import {RegisterComponent} from './register/register';
import {VestigingOverzicht} from './vestiging-overzicht/vestiging-overzicht';

export const routes: Routes = [
  // Openbare login-pagina
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'vestigingen', component: VestigingOverzicht },

  {
    path: 'vestigingen/:id',
    loadComponent: () =>
      import('./vestiging-detail/vestiging-detail')
        .then(m => m.VestigingDetail),
  },


  // Toegang geweigerd
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },

  // Standaard naar home (AuthGuard zorgt voor login-redirect)
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },

  // Fallback voor onbekende URL’s
  {
    path: '**',
    redirectTo: 'home'
  }
];
