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

  async login(): Promise<void> {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    const openSnackBar = () => {
      this.snackBar.open('ログインしました', undefined, {
        duration: 2500,
      });
    };
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.afAuth.signInWithPopup(provider).then((result) => {
      if (result.additionalUserInfo?.isNewUser) {
        this.router.navigateByUrl('/sign-up');
        openSnackBar();
      } else {
        this.router.navigateByUrl('');
        openSnackBar();
      }
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
