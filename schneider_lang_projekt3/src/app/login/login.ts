import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router) {}

  onSubmit() {
    const name     = (document.getElementById('loginName') as HTMLInputElement).value;
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user  = users.find((u: any) => u.name === name && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.router.navigate(['/liste']);
    } else {
      const err = document.getElementById('loginError')!;
      err.style.display = 'block';
    }
  }
}
