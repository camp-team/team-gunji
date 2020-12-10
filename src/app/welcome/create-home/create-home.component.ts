import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Home } from 'src/app/interfaces/home';
import { Room } from 'src/app/interfaces/room';
import { UserData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-create-home',
  templateUrl: './create-home.component.html',
  styleUrls: ['./create-home.component.scss'],
})
export class CreateHomeComponent implements OnInit {
  user$: Observable<UserData> = this.authService.user$;
  isProcessing: any;

  readonly rooms: Omit<Room, 'id' | 'completedAt'>[] = [
    {
      imageId: 0,
      name: 'リビング',
      pooCount: 0,
    },
    {
      imageId: 1,
      name: 'ダイニング',
      pooCount: 0,
    },
    {
      imageId: 2,
      name: 'キッチン',
      pooCount: 0,
    },
    {
      imageId: 3,
      name: 'バスルーム',
      pooCount: 0,
    },
    {
      imageId: 4,
      name: 'トイレ',
      pooCount: 0,
    },
    {
      imageId: 5,
      name: 'エントランス',
      pooCount: 0,
    },
    {
      imageId: 6,
      name: 'ベッドルーム',
      pooCount: 0,
    },
    {
      imageId: 7,
      name: 'デスク',
      pooCount: 0,
    },
    {
      imageId: 8,
      name: 'ランドリー',
      pooCount: 0,
    },
  ];

  roomsFormGroup: FormGroup = this.fb.group({
    roomsArray: this.fb.array(this.rooms.map((room) => new FormControl(false))),
  });

  get roomsArray(): FormArray {
    return this.roomsFormGroup.get('roomsArray') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {}

  submit(uid: string): void {
    this.isProcessing = true;
    const formValue = this.roomsFormGroup.value.roomsArray;
    const selectedIds: number[] = Object.entries(formValue)
      .filter(([key, value]) => value)
      .map(([key, value]) => +key);
    const selectedRooms: Omit<
      Room,
      'id' | 'completedAt'
    >[] = this.rooms.filter((room) => selectedIds.includes(room.imageId));

    this.roomService
      .createRooms(selectedRooms, uid)
      .finally(() => (this.isProcessing = false));
  }
}
