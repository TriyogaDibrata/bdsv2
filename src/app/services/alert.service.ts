import { Injectable } from '@angular/core';
import { ModalAlertComponent } from '@components/modal-alert/modal-alert.component';
import { AlertOptions } from '@interfaces/alert';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private modalCtrl: ModalController) {}

  async showAlert(opts: AlertOptions) {
    const modal = await this.modalCtrl.create({
      component: ModalAlertComponent,
      componentProps: opts,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
      mode: 'ios',
      handle: false,
      backdropDismiss: false,
    });

    await modal.present();
  }
}
