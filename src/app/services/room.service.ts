import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Home } from '../interfaces/home';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private db: AngularFirestore, private router: Router) {}

  async createHome(home: Omit<Home, 'id'>): Promise<void> {
    const id = this.db.createId();
    await this.db
      .doc<Home>(`homes/${id}`)
      .set({
        id,
        ...home,
      })
      .then(() => {
        this.router.navigateByUrl(`home/${id}`);
      });
  }
}
