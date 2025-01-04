import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../User/components/header/header.component';
import { AdminheaderComponent } from '../admin/adminheader/adminheader.component';
import { LoginUserService } from '../User/services/login-user.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, AdminheaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  loginedUser = inject(LoginUserService)
  
}
