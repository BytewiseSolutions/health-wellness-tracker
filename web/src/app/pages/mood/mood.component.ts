import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-mood',
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './mood.component.html',
  styleUrl: './mood.component.scss'
})
export class MoodComponent {

}