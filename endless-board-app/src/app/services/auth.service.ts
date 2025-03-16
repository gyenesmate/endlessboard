import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(token: string): void {
    localStorage.setItem('authToken', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  register(token: string): void {
    localStorage.setItem('authToken', token);
  }
}
