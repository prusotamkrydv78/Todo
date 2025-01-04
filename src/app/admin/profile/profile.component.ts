import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile = {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '',
    confirmPassword: '',
  };

  updateProfile() {
    // Add validation logic here
    if (this.profile.password !== this.profile.confirmPassword) {
      alert('Passwords do not match!');
    } else {
      alert('Profile updated successfully!');
      console.log(this.profile);
    }
  }
}
