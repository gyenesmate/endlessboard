import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth : AngularFireAuth
  ) { }

  async loginVerification(email: string, password: string): Promise<boolean> {
    try {
      await this.fireAuth.signInWithEmailAndPassword(email, password);
      console.log("Login success in auth.service.ts");
      return true;
    } catch (err) {
      console.log("Login error in auth.service.ts: \n" + err);
      return false;
    }
  }

  async registerVerification(email: string, password: string): Promise<boolean> {
    try {
      await this.fireAuth.createUserWithEmailAndPassword(email, password);
      console.log("Register success in auth.service.ts");
      return true;
    } catch (err) {
      console.log("Register error in auth.service.ts: \n" + err);
      return false;
    }
  }

  async logoutVerification(): Promise<boolean> {
    try {
      await this.fireAuth.signOut();
      localStorage.clear();
      console.log("Logout success in auth.service.ts");
      return true;
    } catch (err) {
      console.log("Logout error in auth.service.ts: \n" + err);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
