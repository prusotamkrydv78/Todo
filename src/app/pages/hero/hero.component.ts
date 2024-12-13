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
  taskData = {
    title: '',
    description: '',
  };
  constructor(private http: HttpClient) {}
  route = inject(Router);
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
    if (this.taskData.title.trim()) {
      console.log('New Task:', this.taskData);
      this.http
        .post('http://localhost:3000/profiles', this.taskData)
        .subscribe((rss) => {
          console.log(rss);
           
        })

        
      this.taskData = {
        title: '',
        description: '',
      }; // Reset the input field
      this.showDialog = false; // Close the dialog
    } else {
      alert('Task cannot be empty!');
    }
  }
}
