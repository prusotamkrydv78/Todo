import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { LoginUserService } from '../../services/login-user.service';
import * as bcrypt from 'bcryptjs';

interface registerUser {
  email: string;
  username: string;
  password: any;
  userType: string;
  userList?: string[];
  adminUsername?: string;
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
  async hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);

    
  }
  //clearing the fields
  clearRegisterFields() {
    this.registerUser = {
      email: '',
      username: '',
      password: '',
      userType: '',
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

  async onRegister(event: Event) {
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
        let hashedPassword = await this.hashPassword(this.registerUser.password)
        if(hashedPassword){
          this.registerUser={...this.registerUser,password:hashedPassword}
        }
        if (this.registerUser.userType == 'admin') {
          this.registerUser = { ...this.registerUser, userList: [] };
          console.log(this.registerUser);
        } else if (this.registerUser.userType == 'user') {
          this.registerUser = {
            ...this.registerUser,
            adminUsername: this.registerUser.adminUsername,
          };

          const adminUser = this.AllUsers.find(
            (user: any) => user.username === this.registerUser.adminUsername
          );

          if (adminUser) {
            // Ensure userList exists
            const updatedUser = {
              ...adminUser,
              userList: [
                ...(adminUser.userList || []),
                this.registerUser.username,
              ],
            };
            this.http
              .patch(`http://localhost:3000/users/${adminUser.id}`, updatedUser)
              .subscribe({
                next: (res) => {
                  console.log('Patch successful:', res);
                },
                error: (err) => {
                  console.error('Error during PATCH:', err);
                },
              });
          } else {
            console.error('Admin user not found.');
          }
          // console.log(this.registerUser);
        } else {
          this.registerUser;
          console.log(this.registerUser);
        }

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
    let loginedUser: {};
    //checking the user is regiter or not
    this.AllUsers.forEach((user: registerUser) => {
      if (
        user.username == this.loginUser.username &&
        user.password == this.loginUser.password
      ) {
        isValidUser = true;
        loginedUser = user;
      }
    });
    // checking the fileds are filled or not
    if (this.loginUser.username || this.loginUser.password) {
      // saving logined user data into local storage
      if (isValidUser) {
        localStorage.setItem('loginUser', JSON.stringify(loginedUser));
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
