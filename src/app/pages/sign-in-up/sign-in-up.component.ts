import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

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
            this.isRegisterMode = false;
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
  onLogin() {
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
