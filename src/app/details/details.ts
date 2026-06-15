import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Header } from '../header/header';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './details.html',

})
export class Details implements OnInit {

  user: any = null;
  editMode = false;
  userId = '';
  isOwnProfile = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    const snapshot = await getDoc(doc(db, 'users', this.userId));
    if (snapshot.exists()) {
      this.user = snapshot.data();
    }
    this.isOwnProfile = auth.currentUser?.uid === this.userId;
  }

  startEdit() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
  }

  async saveEdit() {
    const updated: any = {
      name: (document.getElementById('editName') as HTMLInputElement).value.trim(),
    };

    if (this.user.klasse !== undefined) {
      updated.klasse = (document.getElementById('editKlasse') as HTMLInputElement).value.trim();
    }
    if (this.user.abteilung !== undefined) {
      updated.abteilung = (document.getElementById('editAbteilung') as HTMLSelectElement).value;
    }
    if (this.user.faecher !== undefined) {
      updated.faecher = (document.getElementById('editFaecher') as HTMLInputElement).value.trim();
    }
    updated.geburtsdatum = (document.getElementById('editGeburtsdatum') as HTMLInputElement).value;

    const bildFile = (document.getElementById('editBild') as HTMLInputElement).files?.[0];
    if (bildFile) {
      updated.bild = await this.toBase64(bildFile);
    }

    await updateDoc(doc(db, 'users', this.userId), updated);
    this.user = { ...this.user, ...updated };
    this.editMode = false;
  }

  toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload  = () => resolve(reader.result as string);
      reader.onerror = () => reject('Bild konnte nicht geladen werden');
    });
  }

  emailCopied = false;

  copyEmail() {
    navigator.clipboard.writeText(this.user.email);
    this.emailCopied = true;
    setTimeout(() => this.emailCopied = false, 1500);
  }

  goBack() {
    this.router.navigate(['/liste']);
  }
}
