import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { UserManagementService } from './user-management.service';
import { addDoc, arrayRemove, arrayUnion, collection, collectionData, collectionGroup, CollectionReference, deleteDoc, doc, Firestore, getDocs, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { Route } from '../shared/route';
import { combineLatest, map, Observable, take } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IndexedDBService } from './indexeddb.service';

@Injectable({
  providedIn: 'root'
})
export class RouteManagementService {

  private user?: User;
  private userEmail!: string; 

  constructor(
    private userManagementService: UserManagementService,
    private firestore: Firestore,
    private dbService: IndexedDBService
  ) {
    const userEmail = localStorage.getItem("userEmail"); 
    if (userEmail) {
      this.userEmail = userEmail;
    }
  }

  /* IndexDB functionality */
  toggleLikeInIndexDB(route: Route) {    
    this.dbService.getRouteLikeByRouteID(route.id).subscribe(result => {
      if (result) {
        this.dbService.deleteRouteLike(result.id).subscribe();
      } else {
        this.dbService.addRouteLike({routeID: route.id}).subscribe();
      }
    });
  }

  async syncPendingLikes(routes$: Observable<Route[]>) {
    combineLatest([
    routes$,
    this.dbService.getAllRouteLikes()
    ])
    .pipe(take(1))
    .subscribe(([routes, pendingLikes]) => {
      if (pendingLikes) {
        pendingLikes.forEach((pendingLike: any) => {
          const matchedRoute = routes.find(route => route.id === pendingLike.routeID);

          if (matchedRoute) {
            this.toggleLikeRoute(matchedRoute, this.userEmail);
            this.dbService.deleteRouteLike(pendingLike.id).subscribe();
          }
        });
      }
    });
  }

  /* Firestore Database functionality */
  public async createRouteInDB(  
    title: string,  
    description: string,  
    grade: string,   
    holds: any[] 
  ): Promise<string | null> {  
    if (this.userManagementService.isLoggedIn()) {  
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

          const routesRef = collection(this.firestore, `users/${userId}/routes`);  

          const newRouteDoc = await addDoc(routesRef, {  
            title,  
            description,  
            grade,    
            likes,  
            createdAt: new Date(),  
            holds,
            userEmail,
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

  public getAllRoutesObs(): Observable<Route[]> {
    const routesCollection = collectionGroup(this.firestore, 'routes');
    return collectionData(routesCollection, { idField: 'id' }) as Observable<Route[]>;
  }

  public getRoutesByUserDocIdObs(userDocId: string): Observable<Route[]> {
    const routesRef = collection(this.firestore, `users/${userDocId}/routes`) as CollectionReference<Route>;
    return collectionData(routesRef, { idField: 'id' }) as Observable<Route[]>;
  }

  public async deleteRouteByEmailAndRouteId(userEmail: string, routeDocId: string): Promise<void> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('userEmail', '==', userEmail));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('User not found with email:', userEmail);
      return;
    }

    const userDocId = querySnapshot.docs[0].id;

    const routeRef = doc(this.firestore, 'users', userDocId, 'routes', routeDocId);
    await deleteDoc(routeRef);
    console.log(`Route ${routeDocId} deleted for user ${userEmail}`);
  }

  async toggleLikeRoute(route: Route, currentUserEmail: string): Promise<void> {
    if (navigator.onLine) {
      const userDocId = await this.userManagementService.getUserDocIdByEmail(route.userEmail);
      
      if (!route.id || !userDocId) return;
      const routeDocRef = doc(this.firestore, `users/${userDocId}/routes/${route.id}`);
  
      const alreadyLiked = (route.likedBy ?? []).includes(currentUserEmail);
  
      if (alreadyLiked) {
        await updateDoc(routeDocRef, {
          likes: (route.likes ?? 1) - 1,
          likedBy: arrayRemove(currentUserEmail)
        });
      } else {
        await updateDoc(routeDocRef, {
          likes: (route.likes ?? 0) + 1,
          likedBy: arrayUnion(currentUserEmail)
        });
      }
    } else {      
      this.toggleLikeInIndexDB(route);
    }
  }
}
