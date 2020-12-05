import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    const userData = {
      name: user.displayName || '',
      avatarURL: user.photoURL?.replace('_nomal', '') || '',
      email: user.email || '',
      uid: user.uid,
      createdAt: new Date(),
    };
    return db.doc(`users/${user.uid}`).set(userData);
  });
