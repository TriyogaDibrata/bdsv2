import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api-response';
import { ModalController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-modal-uplaod-disposisi',
  templateUrl: './modal-uplaod-disposisi.component.html',
  styleUrls: ['./modal-uplaod-disposisi.component.scss'],
})
export class ModalUplaodDisposisiComponent implements OnInit {
  selected_uk: number[];
  is_mustiple: boolean = false;
  note: string;

  @Input() partials: any;
  @Input() inbox_id: number;

  constructor(
    private req: RequestService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
  ) {}

  ngOnInit() {}

  async sendDisposisi() {
    let body = {
      inbox_id: this.inbox_id,
      keterangan: this.note,
      unit_kerja: this.selected_uk,
    };
    await this.req.apiPost('surat/disposisi/add', body).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.modalCtrl.dismiss().then(() => {
            this.alertService.showAlert({
              status: 'success',
              autoClose: true,
              duration: 1500,
              showConfirmButton: true,
              title: 'Success',
              text: res.msg,
            });
          });
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
