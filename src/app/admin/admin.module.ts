import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserTaskDetailsComponent } from './user-task-details/user-task-details.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: '', component: AdminComponent },
          { path: 'user-data', component: UserTaskDetailsComponent },
          { path: '**', redirectTo: '' },
        ],
      },
    ]),
  ],
})
export class AdminModule {}
