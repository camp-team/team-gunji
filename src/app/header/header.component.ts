import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<UserData> = this.authService.user$;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      console.log(user);
    });
  }
}
