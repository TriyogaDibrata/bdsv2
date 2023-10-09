import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { ApiResponse } from '@interfaces/api-response';
import { Biometric } from '@interfaces/user';
import { NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
import { BiometricsService } from '@services/biometrics.service';
import { LoadingService } from '@services/loading.service';
import { PushNotifService } from '@services/push-notif.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });
  public showPassword: boolean = false;
  public error: any = '';
  isBiometricAvailable: boolean = false;
  biometricData: Biometric = this.auth.getBiometricData;

  constructor(
    public navCtrl: NavController,
    private auth: AuthService,
    public loader: LoadingService,
    private alertService: AlertService,
    private pushNotif: PushNotifService,
    private biometricService: BiometricsService,
  ) {}

  async ngOnInit() {
    if (await Capacitor.isNativePlatform()) {
      this.isBiometricAvailable = (
        await this.biometricService.checkAvailablity()
      ).isAvailable;
    }
  }

  public login() {
    let formValue = this.loginForm.value;
    formValue['fcm_token'] = this.pushNotif.fcmTokenValue;

    this.auth.login(formValue).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.alertService
            .showAlert({
              status: 'success',
              autoClose: true,
              duration: 1500,
              showConfirmButton: true,
              title: 'Success',
              text: "You're logged in",
            })
            .then(() => {
              this.navCtrl.navigateRoot('home');
            });
        } else {
          this.error = res.msg;
        }
      },
      error: (err) => {
        this.alertService.showAlert({
          status: 'error',
          autoClose: false,
          showConfirmButton: true,
          title: 'Something went wrong',
          text: err.message,
        });
      },
    });
  }

  onInput(ev) {
    this.error = '';
  }

  async performBiometric() {
    await this.biometricService
      .performBiometrics()
      .then(() => {
        this.biometricService.getCredential().then((val) => {
          let data = {
            biometric_user_id: val.username,
            biometric_secret: val.password,
            fcm_token: this.pushNotif.fcmTokenValue,
          };
          this.auth.login(data).subscribe({
            next: (res: ApiResponse) => {
              if (res && res.success) {
                this.alertService
                  .showAlert({
                    status: 'success',
                    autoClose: true,
                    duration: 1500,
                    showConfirmButton: true,
                    title: 'Success',
                    text: "You're logged in",
                  })
                  .then(() => {
                    this.navCtrl.navigateRoot('home');
                  });
              } else {
                this.error = res.msg;
              }
            },
            error: (err) => {
              this.alertService.showAlert({
                status: 'error',
                autoClose: false,
                showConfirmButton: true,
                title: 'Something went wrong',
                text: err.message,
              });
            },
          });
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
