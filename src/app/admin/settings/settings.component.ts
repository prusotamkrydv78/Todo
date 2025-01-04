import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports:[CommonModule,FormsModule]
})
export class SettingsComponent {
  settings = {
    appName: 'To-Do App',
    language: 'en',
    email: 'admin@example.com',
    password: '',
    theme: 'light',
    notifications: true,
  };

  saveSettings() {
    alert('Settings have been saved successfully!');
    console.log(this.settings);
  }
}
