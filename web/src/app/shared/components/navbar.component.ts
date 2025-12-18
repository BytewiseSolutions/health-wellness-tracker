import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <header class="header">
      <nav class="navbar">
        <div class="nav-brand">
          <h2>HealthTracker</h2>
        </div>
        <button class="hamburger" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="nav-links" [class.active]="isMenuOpen">
          <a href="#home" class="nav-link" (click)="closeMenu()">Home</a>
          <a href="#features" class="nav-link" (click)="closeMenu()">Features</a>
          <a href="#about" class="nav-link" (click)="closeMenu()">About</a>
          <a href="#contact" class="nav-link" (click)="closeMenu()">Contact</a>
          <button class="btn btn-primary" (click)="closeMenu()">Login</button>
          <button class="btn btn-secondary" (click)="closeMenu()">Sign Up</button>
        </div>
      </nav>
    </header>
  `
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}