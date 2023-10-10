import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '@interfaces/api-response';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
import { LoadingService } from '@services/loading.service';
import { PushNotifService } from '@services/push-notif.service';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss'],
})
export class SigninModalComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public error: any = '';
  public showPassword: boolean = false;

  constructor(
    public loader: LoadingService,
    private pushNotif: PushNotifService,
    public auth: AuthService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {}

  onInput(ev) {
    this.error = '';
  }

  public login() {
    let formValue = this.loginForm.value;
    formValue['fcm_token'] = this.pushNotif.fcmTokenValue;

    this.auth.login(formValue).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.modalCtrl.dismiss().then(() => {
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
}
