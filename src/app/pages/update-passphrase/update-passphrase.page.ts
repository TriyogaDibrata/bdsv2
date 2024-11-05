import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api-response';
import { NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-update-passphrase',
  templateUrl: './update-passphrase.page.html',
  styleUrls: ['./update-passphrase.page.scss'],
})
export class UpdatePassphrasePage implements OnInit {
  public scrollTop: number = 0;

  constructor(
    private req: RequestService,
    private alertService: AlertService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {}

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  sendRequest() {
    this.req.apiGet('pengajuan-passphrase', {}).subscribe({
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
            title: 'Pengajuan Gagal',
            text: res.msg,
            status: 'warning',
            showConfirmButton: true,
          });
        }
      },
      error: (err) => {
        this.alertService.showAlert({
          title: err?.statusText || err?.status_text,
          text: err?.message || err?.msg,
          status: 'error',
          showConfirmButton: true,
          autoClose: false,
        });
      },
    });
  }
}
