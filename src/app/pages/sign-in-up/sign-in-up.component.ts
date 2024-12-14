import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { LoginUserService } from '../../services/login-user.service';

interface registerUser {
  email: string;
  username: string;
  password: string;
  userType: string;
  userList: string[];
}
interface loginUser {
  username: string;
  password: string;
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
  toastService = inject(ToastService);

  registerUser: registerUser;
  loginUser: loginUser;
  AllUsers: any = [];
  router = inject(Router);
  loginUserService = inject(LoginUserService);
  async ngOnInit() {
    this.clearRegisterFields();
    await this.getAllUsers();
    console.log(this.AllUsers);
  }
  //class ngOnInit

  //clearing the fields
  clearRegisterFields() {
    this.registerUser = {
      email: '',
      username: '',
      password: '',
      userType: '',
      userList: [],
    };
  }
  clearLoginFields() {
    this.loginUser = {
      username: '',
      password: '',
    };
  }

  async getAllUsers() {
    this.clearLoginFields();
    this.clearRegisterFields();
    let res = await this.http.get('http://localhost:3000/users').toPromise();
    this.AllUsers = res;
  }

  onRegister(event: Event) {
    event.preventDefault();
    let isUserRegistered = false;
    // checking the form is empty or not
    if (
      this.registerUser.username ||
      this.registerUser.email ||
      this.registerUser.password ||
      this.registerUser.userType
    ) {
      // matching the already register username
      this.AllUsers.forEach((user) => {
        if (user.username === this.registerUser.username) {
          isUserRegistered = true;
        }
      });

      //registring the user if username is not exist
      if (!isUserRegistered) {
        this.http
          .post('http://localhost:3000/users', this.registerUser)
          .subscribe((data: any) => {
            console.log(data);
            this.toastService.showToast(
              'success',
              'user register successfully'
            );
            this.clearRegisterFields();
            this.loginUserService.isRegisterMode = false;
            this.getAllUsers();
          });
      } else {
        this.toastService.showToast('error', 'Username already register');
        return;
      }
    } else {
      this.toastService.showToast('error', 'fill the above fields to regiter');
    }
  }
  onLogin(event: Event) {
    event.preventDefault();
    let isValidUser = false;
    //checking the user is regiter or not
    this.AllUsers.forEach((user: registerUser) => {
      if (
        user.username == this.loginUser.username &&
        user.password == this.loginUser.password
      ) {
        isValidUser = true;
      }
    });
    // checking the fileds are filled or not
    if (this.loginUser.username || this.loginUser.password) {
      // saving logined user data into local storage
      if (isValidUser) {
        localStorage.setItem('loginUser', JSON.stringify(this.loginUser));
        this.loginUserService.loginUser = JSON.parse(
          localStorage.getItem('loginUser')
        );
        this.router.navigate(['home']);
        this.toastService.showToast('success', 'Login successfully');
        this.clearLoginFields();
      } else {
        this.toastService.showToast('error', 'Invalid user');
      }
    } else {
      this.toastService.showToast('error', 'Fill the above fields');
    }
  }
}
