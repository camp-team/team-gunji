import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Home } from '../interfaces/home';
import { Room } from '../interfaces/room';
import { AuthService } from './auth.service';

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

  async updateRoom(
    roomId: string,
    roomName: string,
    latest: Date,
    pooCount: number,
    uid: number
  ): Promise<void> {
    await this.db.doc(`users/${uid}/rooms/${roomId}`).set({
      roomId,
      roomName,
      latest,
      pooCount,
    });
    console.log('掃除を完了しました');
  }

  getRoom() {}
}
