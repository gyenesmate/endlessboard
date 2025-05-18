import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  
  private storeName: string = 'routeLikes';

  constructor(
    private dbService: NgxIndexedDBService
  ) {}

  // Create: Adds a new route like
  addRouteLike(routeLike: { routeID: string }): Observable<any> {
    return this.dbService.add(this.storeName, routeLike);
  }

  // Read: Get all route likes
  getAllRouteLikes(): Observable<any> {
    return this.dbService.getAll(this.storeName);
  }

  // Read: Get a route like by routeID
  getRouteLikeByRouteID(routeID: string): Observable<any> {
    return this.dbService.getByIndex(this.storeName, 'routeID', routeID);
  }

  // Update: Update routeID by id
  updateRouteLike(id: number, routeID: string): Observable<any> {
    return this.dbService.update(this.storeName, { id, routeID });
  }

  // Delete: Delete by id
  deleteRouteLike(id: number): Observable<any> {
    return this.dbService.delete(this.storeName, id);
  }
}
