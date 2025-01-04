import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [CommonModule],
})
export class UsersComponent {
  users: User[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'Editor',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      role: 'Viewer',
      status: 'Active',
    },
  ];

  addUser() {
    // Placeholder for adding a user
    alert('Add User functionality coming soon!');
  }

  editUser(id: number) {
    // Placeholder for editing a user
    alert(`Edit User with ID: ${id}`);
  }

  deleteUser(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      this.users = this.users.filter((user) => user.id !== id);
    }
  }
}
