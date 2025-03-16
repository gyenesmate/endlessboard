import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserManagmentService } from '../../services/user-managment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  public readonly userRegisterForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userManagment: UserManagmentService,
    private readonly router: Router
  ) {
    this.userRegisterForm = this.formBuilder.group({
      userName: ["", Validators.required],
      userEmail: ["", Validators.required],
      userPassword: ["", Validators.required]
    })
  }

  public registerUser() {
    if (this.userRegisterForm.valid) {
      //console.log(this.userRegisterForm.value["userName"]);
      this.userManagment.register(this.userRegisterForm.value["userName"]);
      this.router.navigateByUrl("/main");
    }
  }
}
