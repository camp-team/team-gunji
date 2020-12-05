import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getUser(uid: string): Observable<UserData | undefined> {
    return this.db.doc<UserData>(`users/${uid}`).valueChanges();
  }

  updateUser(userData: Omit<UserData, 'email'>): Promise<void> {
    return this.db.doc<Omit<UserData, 'email'>>(`users/${userData.uid}`).set(
      {
        ...userData,
      },
      { merge: true }
    );
  }

  updateUserOnlyAvatarId(uid: string, avatarId: number): Promise<void> {
    return this.db.doc<{ avatarId: number }>(`users/${uid}`).set(
      {
        avatarId,
      },
      { merge: true }
    );
  }
}
