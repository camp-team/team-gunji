import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room/room.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RoomComponent],
  imports: [CommonModule, RoomRoutingModule, MatButtonModule],
})
export class RoomModule {}
