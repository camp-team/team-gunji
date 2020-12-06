import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';
import { shouldEventRun, markEventTried } from './utils/should.function';

const db = admin.firestore();

const API_KEY = functions.config().sendgrid.key;

sgMail.setApiKey(API_KEY);

export const sendEmail = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}/rooms/{roomId}')
  .onUpdate(async (change, context) => {
    const eventId = context.eventId;
    const data = change.after.data();

    if (data.pooCount === 3) {
      const userDoc = await db.doc(`users/${context.params.userId}`).get();
      return shouldEventRun(eventId).then(async (should: boolean) => {
        if (should) {
          await sgMail.send({
            from: {
              email: 'hiroponpoko07@gmail.com',
              name: 'UNKO BUSTER',
            },
            to: userDoc.data()?.email,
            templateId: 'd-0870b0742f6641698a7da5f86359e1e2',
            dynamicTemplateData: {
              room: data.name,
            },
          });
          return markEventTried(eventId);
        } else {
          return;
        }
      });
    } else {
      return;
    }
  });
