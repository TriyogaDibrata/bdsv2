import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Browser } from '@capacitor/browser';
import { NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { BarcodeService } from '@services/barcode.service';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
})
export class BarcodeScannerPage implements OnInit {
  torchState: boolean = false;

  constructor(
    private barcodeService: BarcodeService,
    private alertService: AlertService,
    public navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.startScan();
  }

  async startScan() {
    const permission = await this.barcodeService.checkPermission();
    if (permission.granted) {
      const scan = await this.barcodeService.startScan();

      if (scan.hasContent) {
        this.barcodeService.stopScan();
        this.navCtrl.pop().then(async () => {
          if (this.isValidUrl(scan.content)) {
            const browser = await Browser.open({
              url: scan.content,
              toolbarColor: '#d42d2d',
            });
          } else {
            this.alertService.showAlert({
              title: 'Url is not valid !',
              text: 'Cannot open given data/url',
              status: 'warning',
              showConfirmButton: true,
            });
          }
        });
      }
    }
  }

  ngOnDestroy() {
    this.barcodeService.stopScan();
  }

  async toggleTorch() {
    const torchState = await BarcodeScanner.getTorchState();

    if (torchState.isEnabled) {
      BarcodeScanner.disableTorch();
      this.torchState = false;
    } else {
      BarcodeScanner.enableTorch();
      this.torchState = true;
    }
  }

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
}
