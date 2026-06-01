import { Login } from './login/login';
import { Register } from './register/register';
import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'register', component: Register },
];
