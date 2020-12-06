import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateHomeComponent } from './create-home/create-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WelcomeComponent, CreateHomeComponent, SignUpComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MatCheckboxModule,
    MatRadioModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class WelcomeModule {}
