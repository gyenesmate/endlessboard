import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  public userName = "John";

  constructor (
    private readonly authService: AuthService,
  ) {}

  public isLoggedIn() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  public logoutUser() {
    this.authService.logout();
  }

  public getAuthToken() {
    return localStorage.getItem("authToken");
  }
}
