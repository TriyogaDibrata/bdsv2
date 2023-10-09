import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AckComponent } from '@components/ack/ack.component';
import { PdfViewerComponent } from '@components/pdf-viewer/pdf-viewer.component';
import { SheetActionComponent } from '@components/sheet-action/sheet-action.component';
import { SignComponent } from '@components/sign/sign.component';
import { ApiResponse } from '@interfaces/api-response';
import { DocDetail, file, lampiran } from '@interfaces/doc-detail';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { LoadingService } from '@services/loading.service';
import { RequestService } from '@services/request.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-doc',
  templateUrl: './detail-doc.page.html',
  styleUrls: ['./detail-doc.page.scss'],
})
export class DetailDocPage implements OnInit {
  private doc_id: string;
  public scrollTop: number;
  public detailDoc: DocDetail;

  constructor(
    private route: ActivatedRoute,
    private req: RequestService,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    public loader: LoadingService,
  ) {}

  ngOnInit() {
    moment.locale('ID');
    this.doc_id = this.route.snapshot.paramMap.get('id');
    if (this.doc_id) {
      this.getDetail(this.doc_id);
    }
  }

  public async getDetail(id) {
    await this.req.apiGet('doc/' + id).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.detailDoc = res.data.doc;
          this.detailDoc['ack_status'] = res.data.ack_status;
        }
      },
      error: (err) => {
        this.alertService
          .showAlert({
            status: 'error',
            autoClose: false,
            showConfirmButton: true,
            title: err?.statusText,
            text: err?.message,
          })
          .then(() => {
            this.navCtrl.pop();
          });
      },
      complete: () => {
        //get detail load complete !;
      },
    });
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  public convertDate(date) {
    if (!date) {
      return '';
    }
    return moment(date).format('dddd, DD MMMM YYYY');
  }

  prepareSurats(data: file[]) {
    let surats = [];
    data.forEach((el) => {
      surats.push(el.doc_url);
    });
    this.showPdfViewer(surats);
  }

  prepareLampirans(data: lampiran[]) {
    let lampirans = [];
    data.forEach((el) => {
      lampirans.push(el.external_path);
    });
    this.showPdfViewer(lampirans);
  }

  public async showPdfViewer(files: string[]) {
    const modal = await this.modalCtrl.create({
      component: PdfViewerComponent,
      componentProps: {
        files: files,
      },
    });
    await modal.present();
  }

  public async openActionSheet(doc: DocDetail) {
    const modal = await this.modalCtrl.create({
      component: SheetActionComponent,
      componentProps: {
        doc: doc,
      },
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();

    await modal.onDidDismiss().then((res) => {
      if (res.data) {
        if (doc.type_user == 1) {
          //sign
          if (res.data == 1) {
            this.openSignModal(1, 'accept');
          } else {
            this.openSignModal(-1, 'reject');
          }
        } else if (doc.type_user == 0) {
          //acknowledge
          if (res.data == 1) {
            this.openAckModal(1, 'accept');
          } else {
            this.openAckModal(-1, 'reject');
          }
        }
      }
    });
  }

  public async openAckModal(state: number, state_desc: string) {
    const modal = await this.modalCtrl.create({
      component: AckComponent,
      componentProps: {
        data: {
          state: state,
          state_desc: state_desc,
        },
      },
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();

    await modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.ackDoc(res.data, this.detailDoc.id);
      }
    });
  }

  public async openSignModal(state: number, state_desc: string) {
    const modal = await this.modalCtrl.create({
      component: SignComponent,
      componentProps: {
        data: {
          state: state,
          state_desc: state_desc,
        },
      },
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();

    await modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.signDoc(res.data, this.detailDoc.id);
      }
    });
  }

  private async ackDoc(data, id) {
    await this.req.apiPost(`doc/${id}/ack`, data).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.alertService
            .showAlert({
              status: 'success',
              autoClose: true,
              duration: 1500,
              showConfirmButton: true,
              title: 'Success',
              text: res.msg,
            })
            .then(() => {
              this.ngOnInit();
            });
        } else {
          this.alertService.showAlert({
            status: 'error',
            autoClose: false,
            showConfirmButton: true,
            title: 'Something went wrong',
            text: res.msg,
          });
        }
      },
      error: (err) => {
        this.alertService.showAlert({
          status: 'error',
          autoClose: false,
          showConfirmButton: true,
          title: err?.statusText,
          text: err?.message,
        });
      },
    });
  }

  private async signDoc(data, id) {
    if (data?.status == 1) {
      let signData = {};
      if (data?.isBiometric == 1) {
        signData = {
          is_biometric: 1,
          secretkey: data.secretKey,
        };
      } else {
        signData = {
          is_biometric: 0,
          passphrase: data.passphrase,
        };
      }
      this.acceptDoc(signData, id);
    } else if (data?.status == -1) {
      let rejectData = {
        catatan: data?.catatan,
      };
      this.rejectDoc(rejectData, id);
    }
  }

  async acceptDoc(data, id) {
    await this.req.apiPost(`doc/${id}/sign`, data).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.alertService
            .showAlert({
              status: 'success',
              autoClose: true,
              duration: 1500,
              showConfirmButton: true,
              title: 'Success',
              text: res.msg,
            })
            .then(() => {
              this.ngOnInit();
            });
        } else {
          this.alertService.showAlert({
            status: 'error',
            autoClose: false,
            showConfirmButton: true,
            title: 'Something went wrong',
            text: res.msg,
          });
        }
      },
      error: (err) => {
        this.alertService.showAlert({
          status: 'error',
          autoClose: false,
          showConfirmButton: true,
          title: err?.statusText,
          text: err?.message,
        });
      },
    });
  }

  async rejectDoc(data, id) {
    await this.req.apiPost(`doc/${id}/reject`, data).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.alertService
            .showAlert({
              status: 'success',
              autoClose: true,
              duration: 1500,
              showConfirmButton: true,
              title: 'Success',
              text: res.msg,
            })
            .then(() => {
              this.ngOnInit();
            });
        } else {
          this.alertService.showAlert({
            status: 'error',
            autoClose: false,
            showConfirmButton: true,
            title: 'Something went wrong',
            text: res.msg,
          });
        }
      },
      error: (err) => {
        this.alertService.showAlert({
          status: 'error',
          autoClose: false,
          showConfirmButton: true,
          title: err?.statusText,
          text: err?.message,
        });
      },
    });
  }
}
