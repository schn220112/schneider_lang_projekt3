import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { auth, db } from '../firebase';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste.html',
})
export class Liste implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  loading = true;
  searchTerm = '';
  filterRole = '';

  async ngOnInit() {
    const snapshot = await getDocs(collection(db, 'users'));
    this.users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    this.filteredUsers = this.users;
    this.loading = false;
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilter();
  }

  onFilter(event: any) {
    this.filterRole = event.target.value;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredUsers = this.users.filter(u => {
      const matchSearch = !this.searchTerm || u.name?.toLowerCase().includes(this.searchTerm);
      const matchRole   = !this.filterRole || u.role === this.filterRole;
      return matchSearch && matchRole;
    });
  }

  async logout() {
    await signOut(auth);
    window.location.href = '/';
  }
}
