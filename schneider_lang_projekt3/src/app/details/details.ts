import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
})
export class Details implements OnInit {

  user: any = null;
  editMode = false;
  userId = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    const snapshot = await getDoc(doc(db, 'users', this.userId));
    if (snapshot.exists()) {
      this.user = snapshot.data();
    }
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
      updated.abteilung = (document.getElementById('editAbteilung') as HTMLInputElement).value.trim();
    }
    if (this.user.faecher !== undefined) {
      updated.faecher = (document.getElementById('editFaecher') as HTMLInputElement).value.trim();
    }

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

  goBack() {
    this.router.navigate(['/liste']);
  }
}
