import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  constructor(private router: Router) {}

  onSubmit() {
    const name     = (document.getElementById('registerName') as HTMLInputElement).value.trim();
    const password = (document.getElementById('registerPassword') as HTMLInputElement).value;
    const role     = (document.getElementById('role') as HTMLSelectElement).value;
    const errorMsg = document.getElementById('registerError')!;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const exists = users.find((u: any) => u.name === name);
    if (exists) {
      errorMsg.textContent = 'Benutzername bereits vergeben!';
      errorMsg.style.display = 'block';
      return;
    }

    users.push({ name, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    this.router.navigate(['/']);
  }
}
