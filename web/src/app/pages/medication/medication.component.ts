import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-medication',
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './medication.component.html',
  styleUrl: './medication.component.scss'
})
export class MedicationComponent {

}