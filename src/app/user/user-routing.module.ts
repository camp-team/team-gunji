import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: ':id',
    component: UserComponent,
  },
  {
    path: ':id' + '/setting',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
