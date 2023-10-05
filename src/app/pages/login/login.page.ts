import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '@interfaces/api-response';
import { NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
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

  constructor(
    public navCtrl: NavController,
    private auth: AuthService,
    public loader: LoadingService,
    private alertService: AlertService,
    private pushNotif: PushNotifService,
  ) {}

  ngOnInit() {}

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
}
