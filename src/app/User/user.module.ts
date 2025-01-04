// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { authGuard } from './Auth/auth.guard';
import { TasksComponent } from './pages/tasks/tasks.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            canActivate: [authGuard],
            children: [
              { path: '', component: HeroComponent },
              { path: 'tasks', component: TasksComponent },
            ],
          },

          { path: '**', redirectTo: '' },
        ],
      },
    ]),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class userModule {}
