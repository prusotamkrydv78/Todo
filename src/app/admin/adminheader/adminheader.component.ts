import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginUserService } from '../../User/services/login-user.service';

@Component({
  selector: 'app-adminheader',
  imports: [RouterLink],
  templateUrl: './adminheader.component.html',
  styleUrl: './adminheader.component.css',
})
export class AdminheaderComponent {
  router = inject(Router);
  loginUserService = inject(LoginUserService);
  onLogout() {
    let confirms = confirm('Are you sure, want to logout?');
    if (confirms==true) {
      this.loginUserService.loginUser = {
        username: '',
      };
      localStorage.removeItem('loginUser');
      this.router.navigate(['/login']);
    }
  }
}
