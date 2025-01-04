import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: AdminComponent },
          { path: 'user-data', component: TasksComponent },
          { path: 'users', component: UsersComponent },
          { path: 'settings', component: SettingsComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'task/:id', component: TaskDetailComponent },
          { path: 'user/:id', component: UserDetailComponent },
          { path: '**', redirectTo: '' },
        ],
      },
    ]),
  ],
})
export class AdminModule {}
