import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../firebase';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = '/liste';
      }
    });
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    const email      = (document.getElementById('loginName') as HTMLInputElement).value.trim();
    const password   = (document.getElementById('loginPassword') as HTMLInputElement).value;
    const rememberMe = (document.getElementById('rememberMe') as HTMLInputElement).checked;
    const errorMsg   = document.getElementById('loginError')!;

    try {
      // Eingeloggt bleiben = Local, sonst nur für diese Session
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/liste';
    } catch (e) {
      errorMsg.style.display = 'block';
    }
  }
}
