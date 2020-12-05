import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const createPoo = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 168 hours')
  .onRun(async (context) => {
    const rooms = await db
      .collection(`users/${context.auth?.uid}/rooms`)
      .where('pooCount', '<', 3)
      .get();
    const batch = db.batch();
    rooms.forEach((room) => {
      batch.update(room.ref, {
        pooCount: admin.firestore.FieldValue.increment(1),
      });
    });
    return await batch.commit();
  });

export const addPoo = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    return db
      .doc(`users/${context.auth?.uid}/rooms/${data.roomId}`)
      .update('pooCount', admin.firestore.FieldValue.increment(1));
  });
