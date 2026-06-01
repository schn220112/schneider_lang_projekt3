import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router) {}

  async onSubmit() {
    const email    = (document.getElementById('loginName') as HTMLInputElement).value.trim();
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value;
    const errorMsg = document.getElementById('loginError')!;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.router.navigate(['/liste']);
    } catch (e) {
      errorMsg.style.display = 'block';
    }
  }
}
