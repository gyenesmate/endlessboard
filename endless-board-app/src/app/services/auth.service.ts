import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    //private firestore: AngularFirestore
  ) { }

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
