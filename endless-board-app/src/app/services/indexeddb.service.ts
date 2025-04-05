import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  constructor(private dbService: NgxIndexedDBService) {}

  addUser(user: { userName: string; userEmail: string }): Observable<number> {
    return this.dbService.add('users', user).pipe(
      map((record) => record.id) // Extract only the ID
    );
  }

  getUsers(): Observable<any[]> {
    return this.dbService.getAll('users');
  }

  deleteUser(id: number): Observable<boolean> {
    return this.dbService.delete('users', id).pipe(
      map((result) => result.length === 0) // If deletion is successful, result should be an empty array
    );
  }
}
