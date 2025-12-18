import { Component, OnInit, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-admin-users',
  imports: [SidebarComponent, HeaderComponent, DatePipe, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  loading = true;
  showAddModal = false;
  showEditModal = false;
  editingUser: any = null;
  toastMessage = '';
  toastType = '';
  showToastFlag = false;
  newUser = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    village: '',
    city: '',
    country: ''
  };

  constructor(private dashboardService: DashboardService, private ngZone: NgZone) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    console.log('Loading users...');
    console.log('API URL:', 'http://localhost:8080/api/admin/users');
    this.dashboardService.getAllUsers().subscribe({
      next: (users) => {
        console.log('Users loaded successfully:', users);
        this.ngZone.run(() => {
          console.log('Before setting users - loading:', this.loading);
          this.users = [...(users || [])];
          console.log('After setting users - users length:', this.users.length);
          this.loading = false;
          console.log('After setting loading false - loading:', this.loading);
          console.log('Final users array:', this.users);
        });
      },
      error: (error) => {
        console.error('Failed to load users:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        this.users = [];
        this.loading = false;
        this.showToast('Failed to load users. Please refresh the page.', 'error');
      }
    });
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  resetForm() {
    this.newUser = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      village: '',
      city: '',
      country: ''
    };
  }

  createUser() {
    console.log('Creating user:', this.newUser);
    this.dashboardService.createUser(this.newUser).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        this.users.push(response);
        this.showToast('User created successfully!', 'success');
        this.closeAddModal();
      },
      error: (error) => {
        console.error('Error creating user:', error);
        console.error('Error details:', error.error);
        this.showToast('Error creating user: ' + (error.error || error.message), 'error');
      }
    });
  }

  openEditModal(user: any) {
    this.editingUser = { ...user };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingUser = null;
  }

  updateUser() {
    if (!this.editingUser || !this.editingUser.id) {
      console.error('No user selected for editing');
      return;
    }
    
    console.log('Updating user:', this.editingUser);
    this.dashboardService.updateUser(this.editingUser.id, this.editingUser).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        const index = this.users.findIndex(u => u.id === response.id);
        if (index !== -1) {
          this.users[index] = response;
        }
        this.showToast('User updated successfully!', 'success');
        this.closeEditModal();
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.showToast('Error updating user: ' + (error.error || error.message), 'error');
      }
    });
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToastFlag = true;
    setTimeout(() => {
      this.showToastFlag = false;
    }, 3000);
  }

  suspendUser(user: any) {
    this.dashboardService.suspendUser(user.id).subscribe({
      next: (response) => {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], status: 'SUSPENDED' };
        }
        this.showToast('User suspended successfully!', 'success');
      },
      error: (error) => {
        this.showToast('Error suspending user: ' + (error.error || error.message), 'error');
      }
    });
  }

  activateUser(user: any) {
    this.dashboardService.activateUser(user.id).subscribe({
      next: (response) => {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], status: 'ACTIVE' };
        }
        this.showToast('User activated successfully!', 'success');
      },
      error: (error) => {
        this.showToast('Error activating user: ' + (error.error || error.message), 'error');
      }
    });
  }
}