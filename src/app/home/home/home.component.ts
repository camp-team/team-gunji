import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$: Observable<UserData> = this.authService.user$;
  uid: string | any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
