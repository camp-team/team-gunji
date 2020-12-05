import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { ItemsComponent } from './items/items.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [UserComponent, ItemsComponent, SettingsComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
