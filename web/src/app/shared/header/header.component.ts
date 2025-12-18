import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}