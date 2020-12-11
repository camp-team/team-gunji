import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { bounce, fade, float } from 'src/app/animations';
import { Room } from 'src/app/interfaces/room';
import { UserData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations: [fade, bounce, float],
})
export class RoomComponent implements OnInit, OnDestroy {
  readonly TOP_MIN = 100;
  readonly TOP_MAX = 600;
  readonly LEFT_MIN = 1;
  readonly LEFT_MAX = 300;
  top: number[];
  left: number[];
  uid: number | any;
  roomId: string;
  room: Room;
  elapsedDate: number;
  limitDate: number;
  progressNum: number;
  pooLength: Array<number>;

  user$: Observable<UserData> = this.authService.user$;

  roomId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('id');
    })
  );

  room$: Observable<Room> = this.authService.user$.pipe(
    switchMap((user) => {
      return this.roomService.getRoom(user.uid, this.roomId);
    })
  );

  now = new Date();

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      this.uid = user.uid;
    });
    this.route.params.subscribe((params) => {
      this.routingService.roomIdSubject.next(params.id);
      console.log(params);
      console.log(params.id);
    });
    this.roomId$.subscribe((id) => {
      this.roomId = id;
    });
    this.room$.subscribe((room) => {
      this.room = room;
      this.elapsedDate = Math.floor(
        (this.now.getTime() - this.room.completedAt.toMillis()) / 86400000
      );

      console.log(this.elapsedDate);

      this.limitDate = 21 - this.elapsedDate;

      console.log(this.limitDate);

      this.progressNum = Math.min(300, (this.elapsedDate / 21) * 300);

      console.log(this.progressNum);

      this.pooLength = new Array(this.room.pooCount)
        .fill(null)
        .map((_, i) => i + 1);

      this.top = this.pooLength.map(() => {
        return (
          Math.floor(Math.random() * (this.TOP_MAX + 1 - this.TOP_MIN)) +
          this.TOP_MIN
        );
      });
      this.left = this.pooLength.map(() => {
        return (
          Math.floor(Math.random() * (this.LEFT_MAX + 1 - this.LEFT_MIN)) +
          this.LEFT_MIN
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.routingService.roomIdSubject.next(undefined);
  }

  finishedTask(): void {
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
}
