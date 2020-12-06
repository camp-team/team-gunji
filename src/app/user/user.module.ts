import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { ItemsComponent } from './items/items.component';
import { SettingsComponent } from './settings/settings.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { SwiperModule } from 'ngx-swiper-wrapper';

@NgModule({
  declarations: [UserComponent, ItemsComponent, SettingsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    SwiperModule,
  ],
})
export class UserModule {}
