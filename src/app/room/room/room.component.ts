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
    latest: new Date( '2020/12/3 12:20:43'),
    pooCount: 2,
  };

  now = new Date();

  limitDate = this.now.getDay() - this.room.latest.getDay();

  progressNum = (((7 - this.limitDate) / 7 ) * 300 | 0);

  constructor() {}

  finishedTask(){

  }

  ngOnInit(): void {}
}
