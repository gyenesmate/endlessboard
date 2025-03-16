import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagmentService {
  public readonly user: User = {
    userName: "John",
    userEmail: "John@gmail.com",
  }
  
  constructor(
    private readonly authService: AuthService
  ) {}

  public login(userName: string): void {
    this.authService.login(userName);
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public register(userName: string): void {
    this.authService.register(userName);
  }
}
