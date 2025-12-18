import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-journal',
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.scss'
})
export class JournalComponent {

}