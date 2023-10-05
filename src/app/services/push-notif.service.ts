import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from './request.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PushNotifService {
  fcmTokenSubject: BehaviorSubject<string>;
  fcmToken: Observable<string>;
  user = this.auth.userData;

  constructor(
    private req: RequestService,
    private auth: AuthService,
  ) {
    this.fcmTokenSubject = new BehaviorSubject<string>(
      localStorage.getItem('notifToken'),
    );
    this.fcmToken = this.fcmTokenSubject.asObservable();
  }

  async initPushNotif() {
    if (!(await Capacitor.isNativePlatform())) return;
    PushNotifications.removeAllListeners().then(() => {
      this.recievedNotif();
    });
    this.checkPermission();
    this.deliveriedNotif();
  }

  async checkPermission() {
    let permissionStat = await PushNotifications.checkPermissions();

    if (permissionStat.receive === 'prompt') {
      permissionStat = await PushNotifications.requestPermissions();
      if (permissionStat.receive === 'granted') {
        this.checkPermission();
      }
    }

    if (permissionStat.receive !== 'granted') {
      console.error('Permission Denied');
    }

    await PushNotifications.register();
  }

  async recievedNotif() {
    await PushNotifications.addListener('registration', (token) => {
      console.info('Registration token :', token.value);
      if (token && token.value) {
        this.storeNotifToken(token.value);
      }
    });

    await PushNotifications.addListener('registrationError', (err) => {
      console.error('Registration failed :', err.error);
    });

    await PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification) => {
        console.info('Message recieved : ', notification);
        if ((await Capacitor.getPlatform()) === 'android') {
          LocalNotifications.schedule({
            notifications: [
              {
                id: Number(notification?.id),
                title: notification?.title,
                body: notification?.body,
              },
            ],
          });
        }
        return;
      },
    );

    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        console.info(
          'Push notification action performed',
          notification.actionId,
          notification.inputValue,
        );
      },
    );
  }

  async deliveriedNotif() {
    const notifList = await PushNotifications.getDeliveredNotifications();
  }

  storeNotifToken(value) {
    if (!value) return;
    localStorage.setItem('notifToken', value);
    this.fcmTokenSubject.next(value);
  }

  public get fcmTokenValue() {
    return this.fcmTokenSubject.value;
  }

  async updateFcmToken() {
    let body = {
      fcm_token: this.fcmTokenValue,
    };
    await this.req.apiPost(`ref/fcm/update/${this.user?.id}`, body).subscribe({
      next: (res) => {
        //success
      },
      error: (err) => {
        //error
      },
    });
  }

  async removeFcmToken() {
    await this.req.apiPost(`ref/fcm/delete/${this.user?.id}`, {}).subscribe({
      next: (res) => {
        //success
      },
      error: (err) => {
        //error
      },
    });
  }
}
