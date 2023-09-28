import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BarcodeService {
  isPermissionGranted: BehaviorSubject<boolean>;

  constructor() {}

  async checkPermission() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    return status;
  }

  async startScan() {
    document.querySelector('body').classList.add('scanner-active');
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();

    return result;
  }

  stopScan() {
    document.querySelector('body').classList.remove('scanner-active');
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }
}
