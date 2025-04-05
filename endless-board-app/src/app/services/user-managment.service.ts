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

  public login(userName: string): void {
    this.authService.login(userName);
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public register(userName: string): void {
    this.authService.register(userName);
  }

  indexDBaddUser(name: string, email: string) {
    this.indexedDBService
      .addUser({ userName: name, userEmail: email })
      .subscribe((id) => console.log('User added with ID:', id));
  }

  indexDBfetchUsers() {
    this.indexedDBService.getUsers().subscribe((users) => console.log(users));
  }
}
