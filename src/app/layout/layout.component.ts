import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { RouterOutlet } from '@angular/router'; 
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
