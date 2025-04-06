import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { AuthService } from './auth.service';
import { IndexedDBService } from './indexeddb.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagmentService {
  public readonly user: User = {
    userName: "John",
    userEmail: "John@gmail.com",
  }
  
  constructor(
    private readonly authService: AuthService,
    private indexedDBService: IndexedDBService
  ) {}

  public async login(userEmail: string, userPassword: string): Promise<boolean> {
    if (await this.authService.loginVerification(userEmail, userPassword)) {
      console.log('Login succesfull');
      localStorage.setItem('authToken', userEmail);
      return true;
    } else {
      console.log('Login error');
      return false;
    }
    // TODO: here i need to 
  }

  public async register(userEmail: string, userPassword: string): Promise<boolean> {
    if (await this.authService.registerVerification(userEmail, userPassword)) {
      console.log('Register succesfull');
      localStorage.setItem('authToken', userEmail);
      return true;
    } else {
      console.log('Register error');
      return false;
    }
  }

  public logout(): void {
    this.authService.logoutVerification();
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  indexDBaddUser(name: string, email: string): void {
    this.indexedDBService
      .addUser({ userName: name, userEmail: email })
      .subscribe((id) => console.log('User added with ID:', id));
  }

  indexDBfetchUsers(): void {
    this.indexedDBService.getUsers().subscribe((users) => console.log(users));
  }
}
