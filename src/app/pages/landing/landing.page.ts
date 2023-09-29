import { Component, OnInit } from '@angular/core';
import { ModalOptionVerifyComponent } from '@components/modal-option-verify/modal-option-verify.component';
import { ModalVerifyUploadComponent } from '@components/modal-verify-upload/modal-verify-upload.component';
import { ModalController, NavController } from '@ionic/angular';
import { BarcodeService } from '@services/barcode.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private barcodeService: BarcodeService,
  ) {}

  ngOnInit() {}

  async scanBarcode() {
    const permission = await this.barcodeService.checkPermission();

    if (permission.granted) {
      const scan = await this.barcodeService.startScan();

      if (scan.hasContent) {
        this.barcodeService.stopScan();
        alert(scan.content);
      }
    }
  }

  async showModalOption() {
    const modal = await this.modalCtrl.create({
      component: ModalOptionVerifyComponent,
      breakpoints: [1, 0],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();

    const onDismiss = await modal.onDidDismiss();

    if (onDismiss.role == 'chosen') {
      if (onDismiss.data == 'scan') {
        this.navCtrl.navigateForward('barcode-scanner');
      } else if (onDismiss.data == 'upload') {
        this.showModalVerifyUpload();
      }
    }
  }

  async showModalVerifyUpload() {
    const modal = await this.modalCtrl.create({
      component: ModalVerifyUploadComponent,
      breakpoints: [1, 0],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();
  }
}
