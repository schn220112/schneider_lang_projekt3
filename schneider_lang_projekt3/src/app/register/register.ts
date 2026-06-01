import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  constructor(private router: Router) {}

  async onSubmit() {
    const email    = (document.getElementById('registerName') as HTMLInputElement).value.trim();
    const password = (document.getElementById('registerPassword') as HTMLInputElement).value;
    const errorMsg = document.getElementById('registerError')!;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      this.router.navigate(['/']);
    } catch (e) {
      errorMsg.textContent = 'Registrierung fehlgeschlagen!';
      errorMsg.style.display = 'block';
    }
  }
}
