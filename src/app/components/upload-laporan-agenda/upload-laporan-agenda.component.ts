import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendaDetail } from '@interfaces/agenda';
import { ApiResponse } from '@interfaces/api-response';
import { ModalController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { LoadingService } from '@services/loading.service';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-upload-laporan-agenda',
  templateUrl: './upload-laporan-agenda.component.html',
  styleUrls: ['./upload-laporan-agenda.component.scss'],
})
export class UploadLaporanAgendaComponent implements OnInit {
  @Input() data: AgendaDetail;
  base64file: any;
  formLaporan: FormGroup = new FormGroup({
    docfile: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private req: RequestService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    public loader: LoadingService,
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

  submitData() {
    let formData = {
      id: this.data.id,
      deskripsi: this.formLaporan.value.description,
      file: this.base64file,
    };

    this.req.apiPost('agenda/tambah-laporan', formData).subscribe({
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
