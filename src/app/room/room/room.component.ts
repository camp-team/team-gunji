import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Room } from 'src/app/interfaces/room';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  uid: number | any;

  room: Room = {
    id: '1233',
    name: 'kitchen',
    completedAt: firebase.default.firestore.Timestamp.now(),
    imageId: 1,
    pooCount: 2,
  };

  now = new Date();

  elapsedDate = Math.floor(
    (this.now.getTime() - this.room.completedAt.toMillis()) / 86400000
  );

  limitDate = 21 - this.elapsedDate;

  progressNum = Math.min(300, (this.elapsedDate / 21) * 300);

  constructor(
    private roomService: RoomService,
    private authService: AuthService
  ) {}

  finishedTask() {
    this.room.completedAt = firebase.default.firestore.Timestamp.now();
    this.room.pooCount = 0;
    this.limitDate = 21;
    this.progressNum = 0;
    this.roomService.updateRoom(
      this.room.id,
      this.room.name,
      this.room.completedAt,
      this.room.pooCount,
      this.uid
    );
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      this.uid = user.uid;
    });
  }
}
