import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-admin-users',
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class AdminUsersComponent {

}