import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.html',
})
export class Liste implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    this.users = storedUsers;
    this.filteredUsers = storedUsers;
  }

  // 🔥 DAS ist der Klick zur Detailseite
  goToDetails(user: any) {
    this.router.navigate(['/details'], {
      state: { user }   // User wird mitgegeben
    });
  }

  // 🔍 Suche
  onSearch(event: any) {
    const value = event.target.value.toLowerCase();

    this.filteredUsers = this.users.filter(u =>
      u.name?.toLowerCase().includes(value)
    );
  }

  // 🎯 Filter Lehrer / Schüler
  onFilter(event: any) {
    const role = event.target.value;

    if (!role) {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter(u => u.role === role);
  }

  // 🚪 Logout (Firebase oder localStorage Session)
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
}
