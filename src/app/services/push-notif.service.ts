import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root',
})
export class PushNotifService {
  constructor() {}

  initPushNotif() {
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
      (notification) => {
        console.info('Message recieved : ', notification);
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
