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
  tasks?: [];
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
  //hasing the password
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  // unhasing the password
  async handleComparePassword(password: string) {
    try {
      // Compare the password with the hashed one
      const isMatch = await bcrypt.compare(this.loginUser.password, password);

      return isMatch;
    } catch (error) {
      console.error('Error comparing passwords', error);
      return false;
    }
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
    let users:any = await this.http.get('http://localhost:3000/users').toPromise();
    let admins:any = await this.http.get('http://localhost:3000/admins').toPromise();
    this.AllUsers = [...admins,...users];
  }
  async onRegister(event: Event) {
    event.preventDefault();
    let isUserRegistered = false;

    // Ensure fields are filled
    if (
      this.registerUser.username ||
      this.registerUser.email ||
      this.registerUser.password ||
      this.registerUser.userType
    ) {
      // Check if username already exists
      for (const user of this.AllUsers) {
        if (user.username === this.registerUser.username) {
          isUserRegistered = true;
          break;
        }
      }

      if (!isUserRegistered) {
        try {
          // Hash the password
          const hashedPassword = await this.hashPassword(
            this.registerUser.password
          );

          if (this.registerUser.userType === 'admin') {
            this.registerUser = { ...this.registerUser, userList: [] };
            console.log('Admin User:', this.registerUser);
          } else if (this.registerUser.userType === 'user') {
            // Handle user registration as a user type
            const adminData: any = await this.http
              .get('http://localhost:3000/admins')
              .toPromise();

            const adminUser = adminData.find(
              (user: any) => user.username === this.registerUser.adminUsername
            );

            if (adminUser) {
              const updatedUser = {
                ...adminUser,
                userList: [
                  ...(adminUser.userList || []),
                  this.registerUser.username,
                ],
              };

              await this.http
                .patch(
                  `http://localhost:3000/admins/${adminUser.id}`,
                  updatedUser
                )
                .toPromise();
              console.log('Admin user updated successfully');
            } else {
              console.error('Admin user not found');
            }
            this.registerUser = { ...this.registerUser, tasks: [] };
          } else {
            this.registerUser = { ...this.registerUser, tasks: [] };
          }

          // Set hashed password to the user object
          this.registerUser = {
            ...this.registerUser,
            password: hashedPassword,
          };

          // Submit the registration data to server
          if (this.registerUser.userType == 'admin') {
            await this.http
              .post('http://localhost:3000/admins', this.registerUser)
              .toPromise();
          } else {
            await this.http
              .post('http://localhost:3000/users', this.registerUser)
              .toPromise();
          }

          this.toastService.showToast(
            'success',
            'User registered successfully'
          );
          this.clearRegisterFields();
          this.loginUserService.isRegisterMode = false;
          this.getAllUsers();
        } catch (error) {
          console.error('Error during registration:', error);
          this.toastService.showToast(
            'error',
            'Error during user registration'
          );
        }
      } else {
        this.toastService.showToast('error', 'Username already registered');
      }
    } else {
      this.toastService.showToast(
        'error',
        'Please fill in the above fields to register'
      );
    }
  }

  async onLogin(event: Event) {
    event.preventDefault();
    let isValidUser = false;
    let loggedInUser: registerUser | null = null;

    // Loop through the user list using async/await properly
    for (const user of this.AllUsers) {
      if (user.username === this.loginUser.username) {
        const isMatch = await this.handleComparePassword(user.password);

        if (isMatch) {
          isValidUser = true;
          loggedInUser = user; // Found the user
          console.log('User matched');
          break; // Exit the loop once we find a match
        }
      }
    }

    // Validate fields and handle logic after checking the user
    if (this.loginUser.username && this.loginUser.password) {
      if (isValidUser) {
        // Save logged-in user data into local storage
        localStorage.setItem('loginUser', JSON.stringify(loggedInUser));
        this.loginUserService.loginUser = JSON.parse(
          localStorage.getItem('loginUser')!
        );

        this.router.navigate(['home']);
        this.toastService.showToast('success', 'Login successful');
        this.clearLoginFields();
      } else {
        this.toastService.showToast('error', 'Invalid user');
      }
    } else {
      this.toastService.showToast('error', 'Please fill in both fields');
    }
  }
}
