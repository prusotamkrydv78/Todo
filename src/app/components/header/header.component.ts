import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { LoginUserService } from '../../services/login-user.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, MenuModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isDropdownOpen = false;
  loginUserService = inject(LoginUserService);
  isUserLogin: any = {};
  router = inject(Router);
  items = [
    {
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            this.onLogout();
          },
        },
      ],
    },
  ];
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  ngOnInit() {
    this.loginUserService.loginUser = JSON.parse(
      localStorage.getItem('loginUser')
    );
    if (!this.loginUserService.loginUser) {
      this.loginUserService.loginUser = {
        username: '',
      };
    }
  }
  onLogout() {
    this.loginUserService.loginUser = {
      username: '',
    };
    localStorage.removeItem('loginUser');
    this.router.navigate(['/login']);
  }
  onLoginOrRegister(type: string) { 
    this.router.navigate(['/login']);
    if (type == 'login') {
      this.loginUserService.isRegisterMode = true;
    } else {
      this.loginUserService.isRegisterMode = false;
    }
  }
}
