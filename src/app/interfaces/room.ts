export interface Room {
  id: string;
  imageId: number;
  name: string;
  completedAt: firebase.default.firestore.Timestamp;
  pooCount: number;
}
