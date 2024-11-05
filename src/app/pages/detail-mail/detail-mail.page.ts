import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { ModalActionDisposisiComponent } from '@components/modal-action-disposisi/modal-action-disposisi.component';
import { ModalRiwayatDisposisiComponent } from '@components/modal-riwayat-disposisi/modal-riwayat-disposisi.component';
import { ModalUplaodDisposisiComponent } from '@components/modal-uplaod-disposisi/modal-uplaod-disposisi.component';
import { PdfViewerComponent } from '@components/pdf-viewer/pdf-viewer.component';
import { ApiResponse } from '@interfaces/api-response';
import { DetailMail } from '@interfaces/mail';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { LoadingService } from '@services/loading.service';
import { RequestService } from '@services/request.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-mail',
  templateUrl: './detail-mail.page.html',
  styleUrls: ['./detail-mail.page.scss'],
})
export class DetailMailPage implements OnInit {
  public scrollTop: number;
  public mailDetail: DetailMail;
  public fileSurat: string;
  public lampirans: string[];
  public canDisposisi: boolean;
  public balasan: any;
  public data: any;
  public maiUrl: string;
  constructor(
    private req: RequestService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public loader: LoadingService,
  ) {}

  ngOnInit() {
    let doc_id = this.route.snapshot.paramMap.get('id');
    let inbox_id = this.route.snapshot.paramMap.get('inbox_id');
    let url = 'surat/detail/' + doc_id;
    if (inbox_id !== 'outbox') {
      this.maiUrl = url + '/' + inbox_id;
    }
    this.getDetailDoc(this.maiUrl);
  }

  private async getDetailDoc(url) {
    await this.req.apiGet(url, {}).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.data = res.data;
          this.mailDetail = res.data.detail;
          this.balasan = res.data.balasan;
          this.fileSurat = res.data.file_surat;
          this.lampirans = res.data.lampiran;
          this.canDisposisi = res.data.action['add_disposisi'];
        }
      },
      error: (err) => {
        this.alertService
          .showAlert({
            status: 'error',
            autoClose: false,
            showConfirmButton: true,
            title: err?.statusText || err?.status_text,
            text: err?.message || err?.msg,
          })
          .then(() => {
            this.navCtrl.pop();
          });
      },
    });
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  convertDate(date) {
    moment.locale('ID');
    if (!date) {
      return '';
    }
    return moment(date).format('dddd, DD MMMM YYYY');
  }

  convertDateWithTime(date) {
    moment.locale('ID');
    return moment(date).format('LLLL');
  }

  async openUrl(url) {
    const browser = await Browser.open({
      url: url,
    });
  }

  prepareSurat(data) {
    let files = [];
    files.push(data);
    this.showPdfViewer(files, 'surat');
  }

  prepareLampiran(data) {
    let files = [];
    data.forEach((el) => {
      files.push(el);
    });
    this.showPdfViewer(files, 'lampiran');
  }

  public async showPdfViewer(files: string[], type) {
    if (files.length > 0) {
      const modal = await this.modalCtrl.create({
        component: PdfViewerComponent,
        componentProps: {
          files: files,
          title: this.mailDetail.nomor,
          type: type,
        },
      });
      await modal.present();
    }
  }

  async openDisposisiModal() {
    const modal = await this.modalCtrl.create({
      component: ModalActionDisposisiComponent,
      breakpoints: [1, 0],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
      componentProps: {
        candisposisi: this.canDisposisi,
      },
    });

    await modal.present();

    await modal.onDidDismiss().then((res) => {
      if (res.data == 'riwayat') {
        this.showRiwayat();
      } else if (res.data == 'disposisi') {
        this.createDisposisi();
      }
    });
  }

  async createDisposisi() {
    const modal = await this.modalCtrl.create({
      component: ModalUplaodDisposisiComponent,
      componentProps: {
        inbox_id: this.data?.surat_masuk_id,
        partials: this.data?.partials,
      },
      breakpoints: [1, 0],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();
  }

  async showRiwayat() {
    const modal = await this.modalCtrl.create({
      component: ModalRiwayatDisposisiComponent,
      componentProps: {
        data: this.data?.partials.riwayat_disposisi,
      },
      initialBreakpoint: 1,
      breakpoints: [1, 0],
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();
  }

  async handleRefresh(ev) {
    await this.req.apiGet(this.maiUrl, {}).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.data = res.data;
          this.mailDetail = res.data.detail;
          this.balasan = res.data.balasan;
          this.fileSurat = res.data.file_surat;
          this.lampirans = res.data.lampiran;
          this.canDisposisi = res.data.action['add_disposisi'];
        }
      },
      error: (err) => {
        this.alertService
          .showAlert({
            status: 'error',
            autoClose: false,
            showConfirmButton: true,
            title: err?.statusText || err?.status_text,
            text: err?.message || err?.msg,
          })
          .then(() => {
            this.navCtrl.pop();
          });
      },
      complete: () => {
        ev.target.complete();
      },
    });
  }
}
