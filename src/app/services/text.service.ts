import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  textZoomSubject: BehaviorSubject<number>;
  textZoom: Observable<number>;

  constructor() {
    this.textZoomSubject = new BehaviorSubject<number>(
      Number(localStorage.getItem('zoomValue')),
    );
    this.textZoom = this.textZoomSubject.asObservable();
  }

  storeZoomData(value) {
    localStorage.setItem('zoomValue', value);
    this.textZoomSubject.next(value);
  }

  public get zoomValue(): number {
    return this.textZoomSubject.value;
  }
}
