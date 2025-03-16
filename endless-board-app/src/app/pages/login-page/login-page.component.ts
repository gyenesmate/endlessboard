import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserManagmentService } from '../../services/user-managment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  public readonly userLoginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userManagment: UserManagmentService,
    private readonly router: Router
  ) {
    this.userLoginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      userPassword: ["", Validators.required]
    })
  }

  public loginUser() {
    if (this.userLoginForm.valid) {
      //console.log(this.userLoginForm.value["userName"]);
      this.userManagment.login(this.userLoginForm.value["userName"]);
      this.router.navigateByUrl("/main");
    }
  }
}
