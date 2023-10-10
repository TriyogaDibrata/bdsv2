import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiResponse } from '@interfaces/api-response';
import { Biometric, User } from '@interfaces/user';
import { NavController } from '@ionic/angular';
import { PushNotifService } from './push-notif.service';
import { BiometricsService } from './biometrics.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  public biometricSubject: BehaviorSubject<Biometric>;
  public biometric: Observable<Biometric>;

  public tempUserSubject: BehaviorSubject<User>;
  public tempUser: Observable<User>;

  constructor(
    private request: RequestService,
    private navCtrl: NavController,
    private biometricsService: BiometricsService,
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user')),
    );
    this.user = this.userSubject.asObservable();

    this.biometricSubject = new BehaviorSubject<Biometric>(
      JSON.parse(localStorage.getItem('biometric')),
    );
    this.biometric = this.biometricSubject.asObservable();

    this.tempUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('temp_user')),
    );
    this.tempUser = this.tempUserSubject.asObservable();
  }

  login(logindata = {}) {
    return this.request.apiPost('login', logindata).pipe(
      map((res: ApiResponse) => {
        if (res && res.data.user) {
          this.storeUserData(res.data.user);
          if (
            this.getTempUserData &&
            this.getTempUserData.id !== res.data.user.id
          ) {
            this.removeUserBiometric();
          }
        }
        return res;
      }),
    );
  }

  storeUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
    this.userSubject.next(data);
  }

  storeBiometricData(data) {
    localStorage.setItem('biometric', JSON.stringify(data));
    this.biometricSubject.next(data);
  }

  storeTempUser(data) {
    localStorage.setItem('temp_user', JSON.stringify(data));
    this.tempUserSubject.next(data);
  }

  public get userData(): User {
    return this.userSubject.value;
  }

  public get getBiometricData(): Biometric {
    return this.biometricSubject.value;
  }

  public get getTempUserData(): User {
    return this.tempUserSubject.value;
  }

  removeUserBiometric() {
    localStorage.removeItem('temp_user');
    this.tempUserSubject.next(null);
    localStorage.removeItem('biometric');
    this.biometricSubject.next(null);
    this.biometricsService.deleteCredential();
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('notifToken');
    this.userSubject.next(null);
    this.navCtrl.navigateRoot('login');
  }
}
