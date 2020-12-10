import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room/room.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [RoomComponent],
  imports: [CommonModule, RoomRoutingModule, MatButtonModule, MatIconModule],
})
export class RoomModule {}
