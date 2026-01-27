import { Component, ViewChild, ViewContainerRef  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { UserManagmentService } from '../../services/user-managment.service';
import { ErrorMassageComponent } from '../../shared/error-massage/error-massage/error-massage.component';

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
  @ViewChild('dynamicErrorHost', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userManagment: UserManagmentService,
    private readonly router: Router
  ) {
    this.userRegisterForm = this.formBuilder.group({
      userName: ["", Validators.required],
      userEmail: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      userPassword: ["", Validators.required]
    })
  }

  public async registerUser() {
    if (this.userRegisterForm.valid) {
      if (await this.userManagment.register(
        this.userRegisterForm.value["userEmail"], 
        this.userRegisterForm.value["userPassword"],
        this.userRegisterForm.value["userName"]
      )) {
        this.router.navigateByUrl("/main");
      } else {
        this.showErrorMessage("Registration failed. Please try again.");
      }
    } else {
      this.showErrorMessage("Please fill all the fields with valid data.");
    }
  }

  private showErrorMessage(message: string): void {
    this.container.clear();
    const errorComponentRef = this.container.createComponent(ErrorMassageComponent);
    errorComponentRef.instance.message = message;
  }
}
