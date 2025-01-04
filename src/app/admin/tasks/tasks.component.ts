import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports:[CommonModule]
})
export class TasksComponent {
  tasks = [
    { id: 1, title: 'Design Admin Dashboard', status: 'Completed' },
    { id: 2, title: 'Implement Task Module', status: 'Pending' },
    { id: 3, title: 'Test To-Do App', status: 'Pending' },
  ];

  addTask() {
    alert('Add Task functionality coming soon!');
  }

  editTask(id: number) {
    alert(`Edit Task with ID: ${id}`);
  }

  deleteTask(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    }
  }
}
