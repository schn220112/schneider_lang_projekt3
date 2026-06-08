import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
})
export class Details implements OnInit {

  user: any = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const snapshot = await getDoc(doc(db, 'users', id));
    if (snapshot.exists()) {
      this.user = snapshot.data();
    }
  }

  goBack() {
    this.router.navigate(['/liste']);
  }
}
