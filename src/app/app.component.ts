import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { TextZoom } from '@capacitor/text-zoom';
import { PushNotifService } from '@services/push-notif.service';
import { TextService } from '@services/text.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private textService: TextService,
    private pushNotif: PushNotifService,
  ) {
    this.setTextSize();
    this.pushNotif.initPushNotif();
  }

  setTextSize() {
    if (this.textService.zoomValue) {
      TextZoom.set({ value: this.textService.zoomValue });
    }
  }
}
