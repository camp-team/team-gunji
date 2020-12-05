import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(): void {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth.signInWithPopup(provider).then((result) => {
      if (result.additionalUserInfo?.isNewUser) {
        this.router.navigateByUrl('/sign-up');
      } else {
        this.router.navigateByUrl('');
      }
    });
    this.snackBar.open('ログインしました', undefined, {
      duration: 2500,
    });
  }

  logout(): void {
    this.afAuth.signOut();
    this.router.navigateByUrl('/welcome');
    this.snackBar.open('ログアウトしました', undefined, {
      duration: 2500,
    });
  }
}
