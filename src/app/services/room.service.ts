import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async createRooms(
    rooms: Omit<Room, 'id' | 'completedAt'>[],
    uid: string
  ): Promise<void> {
    await Promise.all(
      rooms.map((room) => {
        const id: string = this.db.createId();
        return this.db.doc<Room>(`users/${uid}/rooms/${id}`).set({
          ...room,
          id,
          completedAt: firebase.default.firestore.Timestamp.now(),
        });
      })
    ).then(() => this.snackBar.open('ルームを作成しました'));
  }

  async updateRoom(
    roomId: string,
    roomName: string,
    latest: firebase.default.firestore.Timestamp,
    pooCount: number,
    uid: number
  ): Promise<void> {
    await this.db.doc(`users/${uid}/rooms/${roomId}`).update({
      roomId,
      roomName,
      latest,
      pooCount,
    });
    console.log('掃除を完了しました');
  }

  getRooms(uid: string): Observable<Room[]> {
    return this.db.collection<Room>(`users/${uid}/rooms`).valueChanges();
  }
}
