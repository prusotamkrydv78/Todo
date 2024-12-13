import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-task-details',
  imports: [CommonModule,],
  templateUrl: './user-task-details.component.html',
  styleUrl: './user-task-details.component.css'
})
export class UserTaskDetailsComponent {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', tasks: ['Task 1', 'Task 2'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', tasks: ['Task 1'] },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', tasks: ['Task 1', 'Task 2', 'Task 3'] },
  ];

  user: any = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.user = this.users.find((u) => u.id === userId);

    if (!this.user) {
      alert('User not found!');
      this.router.navigate(['/admin']);
    }
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}
