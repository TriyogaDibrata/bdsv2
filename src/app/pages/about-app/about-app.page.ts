import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  AppUpdate,
  AppUpdateAvailability,
} from '@capawesome/capacitor-app-update';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
})
export class AboutAppPage implements OnInit {
  public scrollTop: number = 0;
  currentVersion: string;
  isUpdateAvailable: boolean = false;
  availableVersion: string;
  checkString: string;

  constructor(public loader: LoadingService) {}

  async ngOnInit() {
    this.getCurrentVersion();
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  async getCurrentVersion() {
    const result = await AppUpdate.getAppUpdateInfo({ country: 'ID' });
    this.currentVersion = result.currentVersion;
  }

  checkUpdates() {
    this.checkString = '';
    this.isUpdateAvailable = false;
    this.loader.isLoading.next(true);
    setTimeout(async () => {
      this.loader.isLoading.next(false);
      const result = await AppUpdate.getAppUpdateInfo({ country: 'ID' });
      if (
        result.updateAvailability === AppUpdateAvailability.UPDATE_AVAILABLE
      ) {
        this.isUpdateAvailable = true;
        this.availableVersion = result.availableVersion;
        this.checkString = 'New version available : ' + this.availableVersion;
      } else {
        this.isUpdateAvailable = false;
        this.checkString = 'Your app is up to date';
      }
    }, 3000);
  }

  async updateNow() {
    await AppUpdate.openAppStore({ country: 'ID' });
  }
}
