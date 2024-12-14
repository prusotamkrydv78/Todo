import { Component, inject } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { LoginUserService } from '../../services/login-user.service';
interface taskData {
  title: string;
  description: string;
  userId: string;
}
@Component({
  selector: 'app-hero',
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',

  providers: [DialogService],
})
export class HeroComponent {
  isDialogVisible = false;

  showDialog = false;
  taskData: taskData;
  constructor(private http: HttpClient) {}
  route = inject(Router);
  loginUserService = inject(LoginUserService);

  loginedUser: any;
  ngOnInit() {
    this.loginedUser = this.loginUserService.loginUser;
    this.taskData = {
      title: '',
      description: '',
      userId: this.loginedUser.id,
    };
    console.log(this.loginedUser);
  }
  // addTask() {
  //   if (this.taskData.title.trim()) {
  //     console.log('New Task:', this.taskData);
  //     this.http
  //       .post('https://api.freeapi.app/api/v1/todos/', this.taskData)
  //       .subscribe((rss) => {
  //         console.log(rss);
  //         if (rss['success']) {
  //           console.log('Task added successfully');
  //           this.route.navigate(['/tasks']); // Redirect to tasks page after task is added successfully
  //         } else {
  //           console.log('Failed to add task');
  //         }
  //       });

  //     this.taskData = {
  //       title: '',
  //       description: '',
  //     }; // Reset the input field
  //     this.showDialog = false; // Close the dialog
  //   } else {
  //     alert('Task cannot be empty!');
  //   }
  // }
  addTask() {
    let taskData = { ...this.taskData, useid: this.loginedUser.id };

    if (this.taskData.title.trim()) {
      console.log('New Task:', this.taskData);
      this.http
        .post('http://localhost:3000/tasks', this.taskData)
        .subscribe((rss) => {
          console.log(rss);
        });

      this.taskData = {
        title: '',
        description: '',
        userId: this.loginedUser.id,
      }; // Reset the input field
      this.showDialog = false; // Close the dialog
    } else {
      alert('Task cannot be empty!');
    }
  }
}
