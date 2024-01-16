import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { Filesystem, Directory, WriteFileResult } from '@capacitor/filesystem';
import * as moment from 'moment';
import { ModalDownloadComponent } from '@components/modal-download/modal-download.component';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
  @Input() public files: string[];
  @Input() public title: string;
  @Input() public type: string;

  public pdfOptions: any = {
    zoom: 1.0,
    rotation: 0,
  };

  constructor(
    private modalCrtl: ModalController,
    private alertService: AlertService,
    public loader: LoadingService,
  ) {}

  ngOnInit() {}

  public async closeModal() {
    await this.modalCrtl.dismiss();
  }

  zoomIn() {
    if (this.pdfOptions.zoom >= 2) {
      return;
    }

    this.pdfOptions.zoom += 0.1;
  }

  zoomOut() {
    if (this.pdfOptions.zoom <= 0.5) {
      return;
    }

    this.pdfOptions.zoom -= 0.1;
  }

  rotate() {
    if (this.pdfOptions.rotation >= 270) {
      this.pdfOptions.rotation = 0;
      return;
    }

    this.pdfOptions.rotation += 90;
  }

  onLoadError(ev) {
    this.alertService.showAlert({
      status: 'error',
      autoClose: false,
      showConfirmButton: true,
      title: ev.name,
      text: ev.message,
    });
  }

  async download(url, index) {
    this.loader.isLoading.next(true);
    let title = this.title.split('/').join('_');
    let dateNow = moment().format('YYYYMMDDHHMMss');
    let docName = this.type + '_' + title + '_' + dateNow + '.pdf';
    if (!this.title) {
      docName = this.type + '_' + dateNow + '.pdf';
    }

    const options: HttpOptions = {
      url: url,
      method: 'GET',
      responseType: 'blob',
    };

    const request = await CapacitorHttp.get(options)
      .then(async (response: HttpResponse) => {
        this.loader.isLoading.next(false);
        if (response && response.data) {
          const saveFile = await Filesystem.writeFile({
            path: docName,
            data: response.data,
            directory: Directory.Documents,
          })
            .then(async (value: WriteFileResult) => {
              const modal = await this.modalCrtl.create({
                component: ModalDownloadComponent,
                componentProps: {
                  data: {
                    name: docName,
                    path: value.uri,
                  },
                },
                breakpoints: [0, 1],
                initialBreakpoint: 1,
                cssClass: 'modal-sheet-auto-height',
              });
              await modal.present();
            })
            .catch((err) => {
              this.alertService.showAlert({
                title: 'Download Failed',
                text: 'Unable to download file',
                status: 'error',
                autoClose: false,
                showConfirmButton: true,
              });
            });
        } else {
          this.alertService.showAlert({
            title: 'Download Failed',
            text: 'Unable to download file',
            status: 'error',
            autoClose: false,
            showConfirmButton: true,
          });
        }
      })
      .catch((err) => {
        this.loader.isLoading.next(false);
        this.alertService.showAlert({
          title: 'Download Failed',
          text: 'Unable to download file',
          status: err.message,
          autoClose: false,
          showConfirmButton: true,
        });
      });
  }
}
