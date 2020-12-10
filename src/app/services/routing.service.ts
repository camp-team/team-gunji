import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  roomIdSubject = new ReplaySubject<string>();
  roomId$: Observable<string> = this.roomIdSubject.asObservable();

  constructor() {}
}
