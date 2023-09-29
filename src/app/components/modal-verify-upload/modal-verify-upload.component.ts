import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalVerifyResultComponent } from '@components/modal-verify-result/modal-verify-result.component';
import { ApiResponse } from '@interfaces/api-response';
import { ModalController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { LoadingService } from '@services/loading.service';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-modal-verify-upload',
  templateUrl: './modal-verify-upload.component.html',
  styleUrls: ['./modal-verify-upload.component.scss'],
})
export class ModalVerifyUploadComponent implements OnInit {
  formUpload: FormGroup = new FormGroup({
    docfile: new FormControl('', [Validators.required]),
  });
  base64file: any;

  constructor(
    public loader: LoadingService,
    private req: RequestService,
    private alertService: AlertService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {}

  onFileChanged(ev) {
    if (ev.target.files && ev.target.files[0]) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64file = reader.result;
      };
    }
  }

  public async uploadFile() {
    let formData = {
      file: this.base64file,
    };

    this.req.apiPost('verify-doc', formData).subscribe({
      next: async (res: ApiResponse) => {
        if (res && res.success) {
          const modal = await this.modalCtrl.create({
            component: ModalVerifyResultComponent,
            componentProps: {
              data: res.data,
            },
            breakpoints: [1, 0],
            initialBreakpoint: 1,
            cssClass: 'modal-sheet-auto-height',
          });

          await modal.present();
        } else {
          this.alertService.showAlert({
            title: 'Dokumen Tidak Valid',
            text: 'Dokumen atau sertifikat yang digunkan tidak dapat divalidasi',
            status: 'warning',
            showConfirmButton: true,
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
      complete: () => {
        this.modalCtrl.dismiss();
      },
    });
  }
}
