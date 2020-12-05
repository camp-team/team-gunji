import { Firestore } from '@google-cloud/firestore';
import { from } from 'rxjs';
export interface Room {
  id: string;
  imageId: number;
  name: string;
  completedAt: firebase.default.firestore.Timestamp;
  pooCount: number;
}
