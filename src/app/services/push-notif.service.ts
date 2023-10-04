import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root',
})
export class PushNotifService {
  constructor() {}

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
    }

    if (permissionStat.receive !== 'granted') {
      console.error('Permission Denied');
    }

    await PushNotifications.register();
  }

  async recievedNotif() {
    await PushNotifications.addListener('registration', (token) => {
      console.info('Registration token :', token.value);
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
}
