import { Routes } from '@angular/router';
import { SignInUpComponent } from './User/pages/sign-in-up/sign-in-up.component';
import { LayoutComponent } from './layout/layout.component';
import { HeroComponent } from './User/pages/hero/hero.component';
import { authGuard } from './User/Auth/auth.guard';
import { TasksComponent } from './User/pages/tasks/tasks.component';
export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    data: { preload: true },
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./User/user.module').then((m) => m.userModule),
    data: { preload: true },
    canActivate:[authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SignInUpComponent,
  },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'home',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: 'home',
  //       component: HeroComponent,
  //       canActivate: [authGuard],
  //     },
  //     {
  //       path: 'tasks',
  //       component: TasksComponent,
  //       canActivate: [authGuard],
  //     },
  //   ],
  // },
];
