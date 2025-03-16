import { Component } from '@angular/core';
import { UserManagmentService } from '../../services/user-managment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  constructor(
    private readonly userManagment: UserManagmentService,
    private readonly router: Router
  ) {}

  public loginUser() {
    this.userManagment.login();
    this.router.navigateByUrl("/main");
  }
}
