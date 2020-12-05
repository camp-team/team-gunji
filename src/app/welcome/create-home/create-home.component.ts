import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Home } from 'src/app/interfaces/home';
import { Room } from 'src/app/interfaces/room';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-home',
  templateUrl: './create-home.component.html',
  styleUrls: ['./create-home.component.scss'],
})
export class CreateHomeComponent implements OnInit {
  rooms: Room[] = [
    {
      roomId: '1',
      roomNum: 1,
      roomName: 'リビング',
      cycle: 21,
      pooCount: 0,
    },
    {
      roomId: '2',
      roomNum: 2,
      roomName: 'ダイニング',
      cycle: 21,
      pooCount: 0,
    },
    {
      roomId: '3',
      roomNum: 3,
      roomName: 'キッチン',
      cycle: 21,
      pooCount: 0,
    },
    {
      roomId: '4',
      roomNum: 4,
      roomName: 'バス',
      cycle: 21,
      pooCount: 0,
    },
    {
      roomId: '5',
      roomNum: 5,
      roomName: 'トイレ',
      cycle: 21,
      pooCount: 0,
    },
    {
      roomId: '6',
      roomNum: 6,
      roomName: '玄関',
      cycle: 21,
      pooCount: 0,
    },
    {
      roomId: '7',
      roomNum: 7,
      roomName: 'ベッドルーム',
      cycle: 21,
      pooCount: 0,
    },
    {
      roomId: '8',
      roomNum: 8,
      roomName: 'デスク',
      cycle: 21,
      pooCount: 0,
    },
    {
      roomId: '9',
      roomNum: 9,
      roomName: 'ランドリー',
      cycle: 21,
      pooCount: 0,
    },
  ];

  roomsFormGroup: FormGroup = this.fb.group({
    roomsArray: this.fb.array([]),
  });

  get roomsArray(): FormArray {
    return this.roomsFormGroup.get('roomsArray') as FormArray;
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.rooms.forEach((room) => {
      this.roomsArray.push(new FormControl(false));
    });
  }

  submit(): void {
    const result = Object.assign({}, this.roomsFormGroup.value, {
      rooms: this.rooms.filter(
        (x, i) => !!this.roomsFormGroup.value.roomsArray[i]
      ),
    });
    // const homeValue: Omit<Home, 'id'> = {
    //   uid
    //   roomId: string[];
    //   isPublic: boolean;
    // };

    console.log(result);
  }
}
