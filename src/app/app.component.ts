import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { HeroComponent } from './pages/hero/hero.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { SignInUpComponent } from './pages/sign-in-up/sign-in-up.component';
@Component({
  selector: 'app-root',
  imports: [ButtonModule, HeaderComponent, FooterComponent, RouterOutlet,SignInUpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'first_angular'; 

}
