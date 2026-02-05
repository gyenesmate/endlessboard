import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { UserManagmentService } from '../../services/user-managment.service';
import { ErrorMessageComponent } from '../../shared/error-message/error-message.component';


@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  public readonly userLoginForm: FormGroup;
  @ViewChild('dynamicErrorHost', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userManagment: UserManagmentService,
    private readonly router: Router
  ) {
    this.userLoginForm = this.formBuilder.group({
      userEmail: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      userPassword: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  public async loginUser() {
    if (this.userLoginForm.valid) {
      if (await this.userManagment.login(this.userLoginForm.value["userEmail"], this.userLoginForm.value["userPassword"])) {
        this.router.navigateByUrl("/main");
      } else {
        this.showErrorMessage("Login failed. Please check your email and password.");
      }    
    } else {
      this.showErrorMessage("Please enter a valid email and password (min. 6 characters).");
    }
  }

  private showErrorMessage(message: string): void {
    this.container.clear();
    const errorComponentRef = this.container.createComponent(ErrorMessageComponent);
    errorComponentRef.instance.message = message;
  }
}
