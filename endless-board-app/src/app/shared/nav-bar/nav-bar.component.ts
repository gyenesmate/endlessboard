import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserManagementService } from '../../services/user-management.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor (
    private readonly authService: AuthService,
    private userManagement: UserManagementService,
  ) {}

  public isLoggedIn() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  public logoutUser() {
    this.userManagement.logout();
  }

  public getAuthToken() {
    return localStorage.getItem("authToken");
  }
}
