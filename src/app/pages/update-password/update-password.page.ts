import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '@interfaces/api-response';
import { NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {
  public scrollTop: number = 0;

  updateForm: FormGroup = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    {
      validators: this.checkingPassword.bind(this),
    },
  );

  errorMessages = {
    oldPassword: [{ type: 'required', message: 'Password lama perlu diisi !' }],
    newPassword: [
      { type: 'required', message: 'Password baru perlu diisi' },
      {
        type: 'minlength',
        message: 'Password minimal harus terdiri dari 6 karakter',
      },
    ],
    confirmNewPassword: [
      { type: 'required', message: 'Password baru perlu diisi' },
      {
        type: 'minlength',
        message: 'Password minimal harus terdiri dari 6 karakter',
      },
    ],
  };

  constructor(
    private req: RequestService,
    private alertService: AlertService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {}

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  checkingPassword(formGroup: FormGroup) {
    const { value: newPassword } = formGroup.get('newPassword');
    const { value: confirmNewPassword } = formGroup.get('confirmNewPassword');
    return newPassword === confirmNewPassword
      ? null
      : { passwordNotMatch: true };
  }

  async submitChange() {
    let data = {
      old_password: this.updateForm.get('oldPassword').value,
      new_password: this.updateForm.get('confirmNewPassword').value,
    };

    await this.req.apiPost('user/update-password', data).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.alertService
            .showAlert({
              title: 'Success',
              text: res.msg,
              status: 'success',
              autoClose: true,
              duration: 1000,
              showConfirmButton: true,
            })
            .then(() => {
              this.navCtrl.pop();
            });
        } else {
          this.alertService.showAlert({
            title: 'Update Failed',
            text: res.msg,
            status: 'error',
            autoClose: false,
            showConfirmButton: true,
          });
        }
      },
      error: (err) => {
        this.alertService.showAlert({
          title: err?.statusText || err?.status_text,
          text: err?.message || err?.msg,
          status: 'error',
          autoClose: false,
          showConfirmButton: true,
        });
      },
    });
  }
}
