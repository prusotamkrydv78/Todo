import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface adminUser {
  email: string;
  username: string;
  password: string;
  userType: string;
  userList: string[];
}
@Component({
  selector: 'app-sign-in-up',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.css',
})
export class SignInUpComponent {
  isRegisterMode: boolean = false; // Track the current mode
  http = inject(HttpClient);

  register() {
    this.isRegisterMode = true; // Switch to register mode
  }

  login() {
    this.isRegisterMode = false; // Switch to login mode
  }
  adminUser: adminUser = {
    email: '',
    username: '',
    password: '',
    userType: '',
    userList: [],
  };
  AllUsers = [];

  ngOnInit() {
    this.http.get('http://localhost:3000/users').subscribe((res: any) => {
      this.AllUsers = res;
      console.log(res);
    });
  }
  //class ngOnInit

  onRegister(event: Event) {
    event.preventDefault();
    let isUserRegistered = false;
    
    this.AllUsers.forEach((user) => {
      if (user.username === this.adminUser.username) {
        isUserRegistered = true;
      }
    });
    if (!isUserRegistered) {
      this.http
        .post('http://localhost:3000/users', this.adminUser)
        .subscribe((data: any) => {
          // console.log(data);
        });
    } else {
      alert('Username already exists');
      return;
    }
    console.log(this.adminUser);
  }
}
