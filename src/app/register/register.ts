import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  constructor(private router: Router) {
  }

  onRoleChange() {
    const role = (document.getElementById('role') as HTMLSelectElement).value;
    document.getElementById('schuelerFelder')!.style.display = role === 'Schüler' ? 'block' : 'none';
    document.getElementById('lehrerFelder')!.style.display = role === 'Lehrer' ? 'block' : 'none';
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const role = (document.getElementById('role') as HTMLSelectElement).value;
    const errorMsg = document.getElementById('registerError')!;

    if (!role) {
      errorMsg.textContent = 'Bitte eine Rolle auswählen!';
      errorMsg.style.display = 'block';
      return;
    }

    let profilDaten: any = {role};

    if (role === 'Schüler') {
      profilDaten.name = (document.getElementById('schuelerName') as HTMLInputElement).value.trim();
      profilDaten.klasse = (document.getElementById('schuelerKlasse') as HTMLInputElement).value.trim();
      profilDaten.abteilung = (document.getElementById('schuelerAbteilung') as HTMLInputElement).value.trim();
      const bildFile = (document.getElementById('schuelerBild') as HTMLInputElement).files?.[0];
      if (bildFile) {
        profilDaten.bild = await this.toBase64(bildFile);
      }
    } else {
      profilDaten.name = (document.getElementById('lehrerName') as HTMLInputElement).value.trim();
      profilDaten.abteilung = (document.getElementById('lehrerAbteilung') as HTMLInputElement).value.trim();
      profilDaten.faecher = (document.getElementById('lehrerFaecher') as HTMLInputElement).value.trim();
      const bildFile = (document.getElementById('lehrerBild') as HTMLInputElement).files?.[0];
      if (bildFile) {
        profilDaten.bild = await this.toBase64(bildFile);
      }
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'users', uid), {
        email,
        ...profilDaten
      });

      window.location.href = '/liste';
    } catch (e) {
      console.error('Fehler:', e);
      errorMsg.textContent = 'Registrierung fehlgeschlagen!';
      errorMsg.style.display = 'block';
    }
  }

  toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject('Bild konnte nicht geladen werden');
    });
  }
}
