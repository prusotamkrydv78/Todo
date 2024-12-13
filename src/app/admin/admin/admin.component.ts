import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', tasks: ['Task 1', 'Task 2'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', tasks: ['Task 1'] },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', tasks: ['Task 1', 'Task 2', 'Task 3'] },
  ];

  constructor(private router: Router) {}

  // Redirect to user details page
  viewUserDetails(userId: number) {
    this.router.navigate([`/admin/user/${userId}`]);
  }
}
