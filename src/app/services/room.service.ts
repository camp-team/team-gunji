import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Room } from '../interfaces/room';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private db: AngularFirestore, private router: Router) {}

  updateRoom(
    roomId: string,
    roomName: string,
    latest: Date,
    pooCount: number,
    uid: number
  ) {
    return this.db
      .doc(`users/${uid}/rooms/${roomId}`)
      .set({
        roomId: roomId,
        roomName: roomName,
        latest: latest,
        pooCount: pooCount,
      })
      .then(() => {
        console.log('掃除を完了しました');
      });
  }

  getRoom() {}
}
