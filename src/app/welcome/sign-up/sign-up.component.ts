import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  charIds1 = [...Array(25)].map((_, i) => i + 1);
  // charIds2 = [...Array(25)].map((_,　i) => i + 25);
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
  form = this.fb.group({
    gender: ['male', Validators.required],
  });

  get gender(): FormControl {
    return this.form.get('gender') as FormControl;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.genderControl = this.form.value;
    console.log(this.genderControl);
  }
}
