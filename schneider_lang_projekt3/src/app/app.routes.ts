import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Liste } from './liste/liste';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'liste', component: Liste, canActivate: [authGuard] },
];

export function authGuard(): boolean {
  const user = localStorage.getItem('loggedInUser');
  if (user) {
    return true;
  } else {
    window.location.href = '/';
    return false;
  }
}
