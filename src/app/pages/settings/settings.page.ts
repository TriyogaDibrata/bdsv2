import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Biometric, User } from '@interfaces/user';
import { AuthService } from '@services/auth.service';
import { BiometricsService } from '@services/biometrics.service';
import { MenuService } from '@services/menu.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public scrollTop: number = 0;
  public isBiometricsAvailable: boolean = false;
  public biometric: Biometric = this.auth.getBiometricData;
  public user: User = this.auth.userData;
  constructor(
    public menu: MenuService,
    public biometricService: BiometricsService,
    public auth: AuthService,
  ) {}

  async ngOnInit() {
    if (await Capacitor.isNativePlatform()) {
      this.isBiometricsAvailable = (
        await this.biometricService.checkAvailablity()
      ).isAvailable;
    }
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }
}
