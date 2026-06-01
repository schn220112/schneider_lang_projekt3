import { Login } from './login/login';
import { Register } from './register/register';
import { Liste } from './liste/liste';
import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'liste', component: Liste },
];
