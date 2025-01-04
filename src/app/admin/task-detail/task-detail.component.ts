import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  imports:[CommonModule,FormsModule]
})
export class TaskDetailComponent implements OnInit {
  task = {
    id: null,
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the task ID from the route parameters
    const taskId = this.route.snapshot.paramMap.get('id');
    
    // Simulating fetching task data based on the ID
    this.loadTaskData(taskId);
  }

  loadTaskData(taskId: string | null) {
    if (taskId) {
      // Simulate fetching task data from a service
      this.task = {
        id: taskId,
        title: 'Sample Task',
        description: 'This is a detailed description of the task.',
        status: 'in-progress',
        dueDate: '2025-01-10',
      };
    }
  }

  saveTask() {
    // Simulate saving task changes
    console.log('Task updated:', this.task);
    alert('Task updated successfully!');
    this.router.navigate(['/tasks']); // Navigate back to tasks list
  }

  deleteTask() {
    // Simulate task deletion
    if (confirm('Are you sure you want to delete this task?')) {
      console.log('Task deleted:', this.task.id);
      alert('Task deleted successfully!');
      this.router.navigate(['/tasks']); // Navigate back to tasks list
    }
  }
}
