import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, updateDoc, deleteDoc, getDoc, DocumentReference, DocumentData, query, where, getDocs } from '@angular/fire/firestore';
import { User } from '../shared/user';
import { AuthService } from './auth.service';
import { IndexedDBService } from './indexeddb.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private user!: User;
  
  constructor(
    private readonly authService: AuthService,
    private firestore: Firestore
  ) {}

  private loadUserOBJ(id: string, userName: string, userEmail: string) {
    this.user = {
      id: id,
      userName: userName,
      userEmail: userEmail
    }
  }

  /* Auth functionality */
  public async login(userEmail: string, userPassword: string): Promise<boolean> {   
    if (await this.authService.loginVerification(userEmail, userPassword)) {
      console.log('Login succesfull');

      this.readUserByEmail(userEmail).then(user => {      
        if (user?.id !== undefined && user?.userName !== undefined && user?.userEmail !== undefined) {
          this.loadUserOBJ(user?.id, user?.userName, user?.userEmail);
          localStorage.setItem('authToken', user?.userName);
          localStorage.setItem('userEmail', user?.userEmail);
        }
      });
      return true;

    } else {
      console.log('Login error');
      return false;
    }
  }

  public async register(userEmail: string, userPassword: string, userName: string): Promise<boolean> {
    if (await this.authService.registerVerification(userEmail, userPassword)) {
      console.log('Register succesfull');

      const docRef = this.createUserInDB(userName, userEmail);
      this.loadUserOBJ((await docRef).id, userName, userEmail);

      localStorage.setItem('authToken', userName);
      localStorage.setItem('userEmail', userEmail);
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

  /* Firestore Database functionality */
  public async createUserInDB(userName: string, userEmail: string): Promise<DocumentReference> {
    const usersRef = collection(this.firestore, 'users');
    const docRef = await addDoc(usersRef, { userName, userEmail });
    console.log('User added to Firestore');
    return docRef;
  }

  public async readUserInDB(docId: string): Promise<DocumentData|null> {
    const userDoc = doc(this.firestore, `users/${docId}`);
    const snapshot = await getDoc(userDoc);
  
    if (snapshot.exists()) {
      const data = snapshot.data();
      return data;
    } else {
      console.log('No such user!');
      return null;
    }
  }

  public async readUserNameByEmail(userEmail: string): Promise<string | null> {  
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('userEmail', '==', userEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data() as { userName?: string };
      return data.userName || null;
    } else {
      console.log('No user found with that email.');
      return null;
    }
  }

  public async readUserByEmail(userEmail: string): Promise<User|null> {  
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('userEmail', '==', userEmail));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as User;
    } else {
      console.log('No user found with that email.');
      return null;
    }
  }

  public async updateUserNameByEmail(userEmail: string, newUserName: string): Promise<void> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('userEmail', '==', userEmail));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('No user found with that email');
      return;
    }

    const userDocRef = querySnapshot.docs[0].ref;
    await updateDoc(userDocRef, { userName: newUserName });
    console.log('User name updated');
  }

  public async deleteUserInDB(docId: string): Promise<void> {
    const userDoc = doc(this.firestore, `users/${docId}`);
    await deleteDoc(userDoc);
    console.log('User deleted');
  }

  public async getUserDocIdByEmail(userEmail: string): Promise<string|null> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('userEmail', '==', userEmail));
    const userDocs = await getDocs(q);
    if (!userDocs.empty) {
      return userDocs.docs[0].id;
    }
    return null;
  }
}
