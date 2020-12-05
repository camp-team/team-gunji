import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/interfaces/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  room: Room = {
    roomId: "1233",
    roomName: "kitchen",
    latest: new Date( '2020/11/2 12:20:43'),
    pooCount: 2,
  };

  now = new Date();

  elapsedDate = Math.floor((this.now.getTime() - this.room.latest.getTime()) / 86400000);

  limitDate = 21 - this.elapsedDate;

  progressNum = Math.min(300, (this.elapsedDate / 21) * 300 );

  constructor() {}

  finishedTask(){

  }

  ngOnInit(): void {}
}
