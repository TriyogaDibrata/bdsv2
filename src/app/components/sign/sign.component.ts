import { Component, Input, OnInit } from '@angular/core';
import { Biometric } from '@interfaces/user';
import { ModalController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
import { BiometricsService } from '@services/biometrics.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  @Input() data: any;
  public note: string;
  public passphrase: string;
  public showPassword: boolean = false;
  public isBiometricAvailable: boolean = false;
  public biometric: Biometric = this.auth.getBiometricData;

  constructor(
    private modalCtrl: ModalController,
    private biometricService: BiometricsService,
    private auth: AuthService,
    private alertService: AlertService,
  ) {}

  async ngOnInit() {
    this.isBiometricAvailable = await (
      await this.biometricService.checkAvailablity()
    ).isAvailable;
  }

  doSign() {
    let data = {
      status: this.data.state,
      catatan: this.note,
      passphrase: this.passphrase,
      isBiometric: 0,
      secretKey: '',
    };
    this.modalCtrl.dismiss(data, 'confirm');
  }

  async performBiometric() {
    await this.biometricService
      .performBiometrics()
      .then(() => {
        this.biometricService.getCredential().then((val) => {
          let data = {
            status: this.data.state,
            catatan: this.note,
            passphrase: '',
            isBiometric: 1,
            secretKey: val.password,
          };
          this.modalCtrl.dismiss(data, 'confirm');
        });
      })
      .catch(() => {
        this.alertService.showAlert({
          title: 'Failed',
          text: 'Verifiying failed',
          showConfirmButton: true,
          autoClose: false,
          status: 'error',
        });
      });
  }
}
