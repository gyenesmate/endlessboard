import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { UserManagmentService } from './user-managment.service';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RouteManagmentService {

  private user?: User;
  private userEmail!: string; 

  constructor(
    private userManagmentService: UserManagmentService,
    /* private firestore: Firestore */
  ) {}

  /* public async createRouteInDB(title: string, description: string, grade: string, wallWidth: number, wallHeight: number): Promise<string | null> {
    if (this.userManagmentService.isLoggedIn()) {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        this.userEmail = userEmail;

        const likes = 0;
    
        const usersRef = collection(this.firestore, 'users');
        const q = query(usersRef, where('userEmail', '==', this.userEmail));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userId = userDoc.id;
    
          // Reference to the 'routes' subcollection under this user
          const routesRef = collection(this.firestore, `users/${userId}/routes`);
    
          // Add a new route document
          const newRouteDoc = await addDoc(routesRef, {
            title,
            description,
            grade,
            wallWidth,
            wallHeight,
            likes,
            createdAt: new Date()
          });
    
          console.log("Route successfully added:", newRouteDoc.id);
          return newRouteDoc.id;
        } else {
          return null;
        } 
      } else {
          console.error("User not found.");
          return null;
      }
    } else {
        console.error("User not LoggedIN.");
        return null;
    }

  }

  public async createHoldInDB(routeId: string, posID: number, angle: number, state: string) {
    if (this.userManagmentService.isLoggedIn()) {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        this.userEmail = userEmail;

        const usersRef = collection(this.firestore, 'users');
        const q = query(usersRef, where('userEmail', '==', this.userEmail));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userId = userDoc.id;
    
          const holdsRef = collection(this.firestore, `users/${userId}/routes/${routeId}/holds`);
    
          await addDoc(holdsRef, {
            posID,
            angle,
            state,
          });
    
          console.log("Hold successfully added.");
        } else {
          console.error("User not found.");
        }
      }
    }
  } */
}
