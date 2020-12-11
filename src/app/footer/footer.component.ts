import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  user$: Observable<UserData> = this.authService.user$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
