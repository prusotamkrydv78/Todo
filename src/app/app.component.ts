import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button'; 
import { ToastModule } from 'primeng/toast'; 
import { LayoutComponent } from "./layout/layout.component";
import { FooterComponent } from './User/components/footer/footer.component';
import { ToastService } from './User/services/toast.service';
@Component({
  selector: 'app-root',
  imports: [ButtonModule, LayoutComponent, ToastModule, LayoutComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'first_angular'; 
  toast = inject(ToastService)
 
}
