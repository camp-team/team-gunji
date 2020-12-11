import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  roomIdSubject = new BehaviorSubject<string>(undefined);
  roomId$: Observable<string> = this.roomIdSubject.asObservable();

  constructor() {}
}
