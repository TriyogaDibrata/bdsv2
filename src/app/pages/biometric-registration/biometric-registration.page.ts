import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api-response';
import { SecretToken } from '@interfaces/secret-token';
import { User } from '@interfaces/user';
import { NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
import { BiometricsService } from '@services/biometrics.service';
import { LoadingService } from '@services/loading.service';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-biometric-registration',
  templateUrl: './biometric-registration.page.html',
  styleUrls: ['./biometric-registration.page.scss'],
})
export class BiometricRegistrationPage implements OnInit {
  public scrollTop: number = 0;
  public showPassphrase: boolean = false;
  public passphrase: string;
  public user = this.auth.userData;
  private secretToken: SecretToken;
  public isBiometricAvailable: boolean = false;

  constructor(
    private biometricService: BiometricsService,
    private alertService: AlertService,
    private req: RequestService,
    private auth: AuthService,
    public navCtrl: NavController,
    public loader: LoadingService,
  ) {}

  async ngOnInit() {
    this.isBiometricAvailable = (
      await this.biometricService.checkAvailablity()
    ).isAvailable;
    if (!this.isBiometricAvailable) {
      this.alertService
        .showAlert({
          title: 'No Biometrics Available',
          text: 'Biometrics is not available on this devices',
          status: 'error',
          autoClose: false,
          showConfirmButton: true,
        })
        .then(() => {
          this.navCtrl.pop();
        });
    }
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  async generateBiometricToken() {
    await this.req.apiPost('bio/generate', {}).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.secretToken = res.data;
          this.validate();
        }
      },
      error: (err) => {},
    });
  }

  async validate() {
    let data = {
      passphrase: this.passphrase,
      secretkey: this.secretToken.secretkey,
      token: this.secretToken.encrypt_token,
    };
    await this.req.apiPost('bio/validate', data).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.performBiometric(res.data.user);
        }
      },
      error: (err) => {
        this.alertService.showAlert({
          title: err?.statusText,
          text: err?.message,
          status: 'error',
          autoClose: false,
          showConfirmButton: true,
        });
      },
    });
  }

  performBiometric(data: User) {
    const verified = this.biometricService
      .performBiometrics()
      .then(() => {
        this.biometricService.deleteCredential();
        this.biometricService.setCredential(
          data.biometric.biometric_user_id,
          this.secretToken.secretkey,
        );
        this.alertService
          .showAlert({
            title: 'Success',
            text: 'Verifiying user complete',
            autoClose: true,
            showConfirmButton: true,
            duration: 2000,
            status: 'success',
          })
          .then(() => {
            this.auth.storeUserData(data);
            this.auth.storeTempUser(data);
            this.auth.storeBiometricData(data.biometric);
            this.navCtrl.pop();
          });
      })
      .catch(() => {
        this.alertService.showAlert({
          title: 'Error',
          text: 'Can not verify user',
          status: 'error',
          showConfirmButton: true,
        });
      });
  }
}
