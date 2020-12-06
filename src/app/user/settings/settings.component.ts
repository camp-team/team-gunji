import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  form = this.fb.group({
    name: ['', Validators.required],
    avatarURL: ['', Validators.required],
    avatarId: ['', Validators.required],
    geder: ['male', Validators.required],
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
    this.userService.updateUserSetting(
      this.user.uid,
      this.form.get('name')?.value,
      this.form.get('avatarURL')?.value,
      this.form.get('avatarId')?.value
    );
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => (this.user = user));
    this.form.get('name')?.setValue(this.user.name);
    this.form.get('avatarURL')?.setValue(this.user.avatarURL);
    this.form.get('avatarId')?.setValue(this.user.avatarId);
  }
}
