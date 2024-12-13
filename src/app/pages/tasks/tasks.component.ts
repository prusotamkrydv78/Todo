import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface tasksListSchema {
  data: any;
  message: string;
  success: boolean;
  statusCode: number;
}
@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  tasksList: tasksListSchema;

  isDialogVisible = false;

  showDialog = false;
  taskData = {
    title: '',
    description: '',
  };
  constructor(private http: HttpClient) {}
  ngOnInit() {
    // want to call api
    this.loadAllTasks();
  }
  loadAllTasks() {
    this.http
      .get('https://api.freeapi.app/api/v1/todos')
      .subscribe((res: any) => {
        if (res) {
          this.tasksList = res;
        }
      });
  }
  onDelete(id: number) {
    this.http
      .delete(`https://api.freeapi.app/api/v1/todos/${id}`)
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.tasksList.data = this.tasksList.data.filter(
            (task: any) => task._id != id
          );
          console.log(this.tasksList);
        }
      });
  }
  onEdit(id: number) {
    
  this.isDialogVisible = true;

  this.showDialog = true;
    let task = this.tasksList.data.filter((task) => {
      return task._id == id;
    });
    this.taskData.title = task[0].title;
    this.taskData.description = task[0].description;
    console.log(task[0]);
  }
  onUpdate(id:number) {
    
  this.isDialogVisible = false;

  this.showDialog = false;
  this.http.patch(`https://api.freeapi.app/api/v1/todos/${id}`,this.taskData).subscribe((res)=>{
    if(res){
      if(res){
        console.log(res);
        
      }
      this.loadAllTasks();
    }
  })

  }
}
