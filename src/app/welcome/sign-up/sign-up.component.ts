import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  submit(): void {}
}
