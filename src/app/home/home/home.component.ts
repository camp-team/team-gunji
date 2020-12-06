import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Room } from 'src/app/interfaces/room';
import { UserData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$: Observable<UserData> = this.authService.user$;
  uid: string | any;

  rooms$: Observable<Room[]> = this.user$.pipe(
    switchMap((user) => {
      const uid = user.uid;
      return this.roomService.getRooms(uid);
    })
  );

  constructor(
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {}
}
