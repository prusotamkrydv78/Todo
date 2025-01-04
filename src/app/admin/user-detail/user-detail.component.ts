import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  imports:[FormsModule,CommonModule]
})
export class UserDetailComponent implements OnInit {
  user = {
    id: null,
    name: '',
    email: '',
    role: 'user',
    status: 'active',
  };

  tasks = [
    { id: 1, title: 'Task 1', status: 'completed', dueDate: '2025-01-10' },
    { id: 2, title: 'Task 2', status: 'pending', dueDate: '2025-01-15' },
    { id: 3, title: 'Task 3', status: 'completed', dueDate: '2025-01-20' },
  ];

  completedTasksCount = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the user ID from the route parameters
    const userId = this.route.snapshot.paramMap.get('id');
    
    // Simulate fetching user data based on the ID
    this.loadUserData(userId);
    this.updateTaskStats();
  }

  loadUserData(userId: string | null) {
    if (userId) {
      // Simulate fetching user data from a service
      this.user = {
        id: userId,
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'user',
        status: 'active',
      };
    }
  }

  updateTaskStats() {
    // Update the count of completed tasks
    this.completedTasksCount = this.tasks.filter(task => task.status === 'completed').length;
  }

  saveUser() {
    // Simulate saving user changes
    console.log('User updated:', this.user);
    alert('User updated successfully!');
    this.router.navigate(['/users']); // Navigate back to users list
  }

  deleteUser() {
    // Simulate user deletion
    if (confirm('Are you sure you want to delete this user?')) {
      console.log('User deleted:', this.user.id);
      alert('User deleted successfully!');
      this.router.navigate(['/users']); // Navigate back to users list
    }
  }

  viewTask(taskId: number) {
    // Navigate to task detail page
    this.router.navigate([`/task/${taskId}`]);
  }

  deleteTask(taskId: number) {
    // Delete the task
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.updateTaskStats();
    alert('Task deleted successfully!');
  }
}
