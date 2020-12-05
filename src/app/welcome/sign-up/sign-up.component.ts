import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
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
  selectedCharId = 0;
  genderControl: string | any;
  form: FormGroup = this.fb.group({
    gender: ['male', [Validators.required]],
  });
  genderValue = this.form.value.gender;
  get gender(): FormControl {
    return this.form.get('gender') as FormControl;
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    public authService: AuthService
  ) {}

  submit(uid: string): void {
    this.userService.updateUserOnlyAvatarId(uid, this.selectedCharId);
    this.router.navigateByUrl('/welcome/create-home');
  }

  ngOnInit(): void {}
}
