import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Liste } from './liste/liste';
import { auth } from './firebase';
import { Details } from './details/details';
import { Landing } from './landing/landing';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'liste', component: Liste, canActivate: [authGuard] },
  { path: 'details/:id', component: Details, canActivate: [authGuard] },
];

export function authGuard(): boolean {
  const user = auth.currentUser;
  if (user) {
    return true;
  } else {
    window.location.href = '/';
    return false;
  }
}
