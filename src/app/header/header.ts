import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class Header implements OnInit {

  username = '';

  async ngOnInit() {
    const uid = auth.currentUser?.uid;
    if (uid) {
      const snapshot = await getDoc(doc(db, 'users', uid));
      if (snapshot.exists()) {
        this.username = snapshot.data()['name'] || '';
      }
    }
  }

  async logout() {
    await signOut(auth);
    window.location.href = '/';
  }
}
