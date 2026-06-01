import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Liste } from './liste/liste';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Details } from './details/details';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'liste', component: Liste, canActivate: [authGuard] },
  { path: 'details', component: Details }
];

export function authGuard(): Promise<boolean> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        window.location.href = '/';
        resolve(false);
      }
    });
  });
}
