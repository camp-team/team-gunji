import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { UserData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: UserData | any;

  selectedCharId = 0;
  charIds = [...Array(50)].map((_, i) => i + 1);
  config: SwiperConfigInterface = {
    loop: true,
    navigation: true,
    pagination: {
      el: '.pager',
      clickable: true,
    },
    centeredSlides: true,
    slidesPerView: 3,
  };

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  form = this.fb.group({
    name: ['', Validators.required],
    avatarURL: ['', Validators.required],
    avatarId: ['', Validators.required],
    gender: ['male', Validators.required],
  });

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get avatarURL(): FormControl {
    return this.form.get('avatarURL') as FormControl;
  }

  get avatarId(): FormControl {
    return this.form.get('avatarId') as FormControl;
  }

  saveValue(): void {
    let selectedIndex: number;
    if (this.form.get('gender')?.value === 'male') {
      selectedIndex = this.selectedCharId;
    } else {
      selectedIndex = this.selectedCharId + 25;
    }
    console.log(selectedIndex);
    this.userService.updateUserSetting(
      this.user.uid,
      this.form.get('name')?.value,
      this.form.get('avatarURL')?.value,
      selectedIndex + 1
    );
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => (this.user = user));
    this.form.get('name')?.setValue(this.user.name);
    this.form.get('avatarURL')?.setValue(this.user.avatarURL);
    this.form.get('avatarId')?.setValue(this.user.avatarId);
  }
}
