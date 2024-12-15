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
import { format } from 'date-fns';
import { ToastService } from '../../services/toast.service';
interface taskData {
  title: string;
  description: string;
  userId: string;
  isCompleted: boolean;
  createdAt: any;
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
  toastService = inject(ToastService);
  loginedUser: any;
  ngOnInit() {
    this.loginedUser = this.loginUserService.loginUser;
    this.taskData = {
      title: '',
      description: '',
      userId: this.loginedUser.id,
      isCompleted: false,
      createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
    console.log(this.loginedUser);
  }

  async addTask() {
    if (this.taskData.title.trim()) {
      const res: any = await this.http
        .post('http://localhost:3000/tasks', this.taskData)
        .toPromise();
      if (res) {
        console.log(res.id);
        let user: any = await this.http
          .get(`http://localhost:3000/users/${res.userId}`)
          .toPromise();
        const updataedUser = { ...user, tasks: [...user.tasks, res.id] };
        await this.http
          .patch(`http://localhost:3000/users/${res.userId}`, updataedUser)
          .toPromise();
      }

      this.taskData = {
        title: '',
        description: '',
        userId: this.loginedUser.id,

        isCompleted: false,
        createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      }; // Reset the input field
      this.toastService.showToast('success', 'Task added successfully');
      this.showDialog = false; // Close the dialog
    } else {
      this.toastService.showToast('error', 'Task cannot be empty');
    }
  }
}
