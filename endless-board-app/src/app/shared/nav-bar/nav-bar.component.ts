import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserManagmentService } from '../../services/user-managment.service';
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
    private userManagment: UserManagmentService,
  ) {}

  public isLoggedIn() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  public logoutUser() {
    this.userManagment.logout();
  }

  public getAuthToken() {
    return localStorage.getItem("authToken");
  }
}
