import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

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

  updateUserSetting(
    uid: string,
    name: string,
    avatarURL: string,
    avatarId: number
  ) {
    return this.db
      .doc<{ name: string; avatarURL: string; avatarId: number }>(
        `users/${uid}`
      )
      .set(
        {
          name,
          avatarURL,
          avatarId,
        },
        { merge: true }
      )
      .then(() => this.snackBar.open('プロフィールを変更しました！'));
  }
}
