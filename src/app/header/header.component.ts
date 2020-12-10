import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Room } from '../interfaces/room';
import { UserData } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  uid: string;
  user$: Observable<UserData> = this.authService.user$;
  roomId: string;
  room$: Observable<Room> = this.user$.pipe(
    switchMap((user) => {
      this.uid = user.uid;
      this.routingService.roomId$.subscribe((data) => {
        this.roomId = data;
        console.log(data);
      });
      return this.roomService.getRoom(this.uid, this.roomId);
    })
  );

  constructor(
    public authService: AuthService,
    private roomService: RoomService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.uid = user.uid;
    });
  }
}
