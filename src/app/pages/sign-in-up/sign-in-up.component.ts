import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in-up',
  imports: [CommonModule],
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.css',
})
export class SignInUpComponent {
  isRegisterMode: boolean = false; // Track the current mode

  register() {
    this.isRegisterMode = true; // Switch to register mode
  }

  login() {
    this.isRegisterMode = false; // Switch to login mode
  }
}
