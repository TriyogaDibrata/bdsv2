import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ApiResponse } from '@interfaces/api-response';
import { DemoLog } from '@interfaces/demo-log';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { App as CapacitorApp } from '@capacitor/app';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  apiUrlSubject: BehaviorSubject<string>;
  apiUrlObs: Observable<string>;

  constructor(private http: HttpClient) {
    this.apiUrlSubject = new BehaviorSubject<string>(
      localStorage.getItem('api_url'),
    );
    this.apiUrlObs = this.apiUrlSubject.asObservable();
  }

  async checkingDemo() {
    this.http.get(`${environment.url.live}` + 'demo', {}).subscribe({
      next: async (res: ApiResponse) => {
        let demoLog: DemoLog;
        let platform = await Capacitor.getPlatform();
        let version = (await CapacitorApp.getInfo()).version;
        if (res && res.success) {
          demoLog = res.data.log;
          if (demoLog.version === version) {
            if (
              (platform === 'ios' && demoLog.ios === 1) ||
              (platform === 'android' && demoLog.android === 1)
            ) {
              this.setDemo();
            } else {
              this.setLive();
            }
          } else {
            this.setLive();
          }
        } else {
          this.setLive();
        }
      },
      error: (err) => {
        this.setLive();
      },
    });
  }

  public get apiUrl(): string {
    return this.apiUrlSubject.value;
  }

  setDemo() {
    localStorage.setItem('api_url', `${environment.url.demo}`);
    this.apiUrlSubject.next(`${environment.url.demo}`);
  }

  setLive() {
    localStorage.setItem('api_url', `${environment.url.live}`);
    this.apiUrlSubject.next(`${environment.url.live}`);
  }
}
