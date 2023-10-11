import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { TextZoom } from '@capacitor/text-zoom';
import { EnvService } from '@services/env.service';
import { PushNotifService } from '@services/push-notif.service';
import { TextService } from '@services/text.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private textService: TextService,
    private pushNotif: PushNotifService,
    private envService: EnvService,
  ) {
    this.initApp();
  }

  async initApp() {
    if (await Capacitor.isNativePlatform()) {
      await SplashScreen.hide();
      this.setTextSize();
      this.pushNotif.initPushNotif();
      this.envService.checkingDemo();
    } else {
      this.envService.setLive();
    }
  }

  setTextSize() {
    if (this.textService.zoomValue) {
      TextZoom.set({ value: this.textService.zoomValue });
    }
  }
}
