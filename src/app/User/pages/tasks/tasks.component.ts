import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { LoginUserService } from '../../services/login-user.service';
import { CheckboxModule } from 'primeng/checkbox';
interface tasksListSchema {
  data: any;
  message: string;
  success: boolean;
  statusCode: number;
}
@Component({
  selector: 'app-tasks',
  imports: [
    FormsModule,
    CommonModule,
    PanelModule,
    AvatarModule,
    ButtonModule,
    MenuModule,
    CheckboxModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  tasksList: any;

  isDialogVisible = false;

  showDialog = false;
  taskData = {
    title: '',
    description: '',
  };
  loginUserService = inject(LoginUserService);
  items = [
    {
      label: 'Refresh',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Search',
      icon: 'pi pi-search',
    },
    {
      separator: true,
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
    },
  ];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    // want to call api
    this.loadAllTasks();
  }
  loadAllTasks() {
    this.http.get('http://localhost:3000/tasks').subscribe((res: []) => {
      if (res) {
        this.tasksList = res.filter(
          (task: any) => task.userId == this.loginUserService.loginUser.id
        );
        console.log(this.tasksList);
      }
    });
  }

  onCompleted(id: number) {
    let task = this.tasksList.find((task: any) => task.id === id);
    console.log(task);

    this.http
      .patch(`http://localhost:3000/tasks/${id}`, task)
      .subscribe((res) => {
        if (res) {
          // console.log(res);
          this.loadAllTasks();
        }
      });
  }
  onDelete(id: number) {
    let user = this.loginUserService.loginUser;
    this.http
      .delete(`http://localhost:3000/tasks/${id}`)
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.tasksList = this.tasksList.filter((task: any) => task.id != id);
        }
      });
    console.log(this.tasksList);
    let updatedTask = user.tasks.filter((item) => item !== id);

    this.http
      .patch(`http://localhost:3000/users/${user.id}`, {
        ...user,
        tasks: updatedTask,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
  onEdit(id: number) {
    this.isDialogVisible = true;

    this.showDialog = true;
    let task = this.tasksList.filter((task) => {
      return task.id == id;
    });
    this.taskData = { ...task[0] };
    console.log(task);
  }
  onUpdate(id: number) {
    this.isDialogVisible = false;

    this.showDialog = false;
    this.http
      .patch(`http://localhost:3000/tasks/${id}`, this.taskData)
      .subscribe((res) => {
        if (res) {
          if (res) {
            console.log(res);
          }
          this.loadAllTasks();
        }
      });
  }
}
