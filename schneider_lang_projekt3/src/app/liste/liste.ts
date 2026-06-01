import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste.html',
})
export class Liste implements OnInit {

  users: any[] = [];
  selectedUser: any = null;

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  showUser(user: any): void {
    this.selectedUser = user;
  }
}
