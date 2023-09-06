import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiResponse } from '@interfaces/api-response';
import { User } from '@interfaces/user';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject: BehaviorSubject<User>;
  user: Observable<User>;

  constructor(
    private request: RequestService,
    private navCtrl: NavController,
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user')),
    );
    this.user = this.userSubject.asObservable();
  }

  login(logindata = {}) {
    return this.request.apiPost('login', logindata).pipe(
      map((res: ApiResponse) => {
        if (res && res.data.user) {
          this.storeUserData(res.data.user);
        }
        return res;
      }),
    );
  }

  storeUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
    this.userSubject.next(data);
  }

  public get userData(): User {
    return this.userSubject.value;
  }

  logout() {
    localStorage.clear();
    this.userSubject.next(null);
    this.navCtrl.navigateRoot('login');
  }
}
