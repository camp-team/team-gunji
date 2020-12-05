import { Component, OnInit } from '@angular/core';
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
    roomId: '1233',
    roomName: 'kitchen',
    latest: new Date('2020/11/26 12:20:43'),
    pooCount: 2,
  };

  now = new Date();

  elapsedDate = Math.floor(
    (this.now.getTime() - this.room.latest.getTime()) / 86400000
  );

  limitDate = 21 - this.elapsedDate;

  progressNum = Math.min(300, (this.elapsedDate / 21) * 300);

  constructor(
    private roomService: RoomService,
    private authService: AuthService
  ) {}

  finishedTask() {
    this.room.latest = new Date();
    this.room.pooCount = 0;
    this.limitDate = 21;
    this.progressNum = 0;
    this.roomService.updateRoom(
      this.room.roomId,
      this.room.roomName,
      this.room.latest,
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
