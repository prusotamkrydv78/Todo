import { Routes } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AdminComponent } from './admin/admin/admin.component';
import { UserTaskDetailsComponent } from './admin/user-task-details/user-task-details.component';
import { SignInUpComponent } from './pages/sign-in-up/sign-in-up.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './Auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SignInUpComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HeroComponent,
        canActivate: [authGuard],
      },
      {
        path:'tasks',
        component:TasksComponent,
        canActivate:[authGuard]
      }
    ],
  },
];
