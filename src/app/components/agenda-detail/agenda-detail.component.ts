import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { UploadLaporanAgendaComponent } from '@components/upload-laporan-agenda/upload-laporan-agenda.component';
import { AgendaDetail } from '@interfaces/agenda';
import { ApiResponse } from '@interfaces/api-response';
import { ModalController } from '@ionic/angular';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-agenda-detail',
  templateUrl: './agenda-detail.component.html',
  styleUrls: ['./agenda-detail.component.scss'],
})
export class AgendaDetailComponent implements OnInit {
  @Input() id: number;
  public detail: AgendaDetail;

  constructor(
    private req: RequestService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.getDetailAgenda();
  }

  getDetailAgenda() {
    this.req.apiGet('agenda/' + this.id + '/detail', {}).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.detail = res.data.schedule;
        }
      },
    });
  }

  async openUrl(url) {
    const open = await Browser.open({ url: url });
  }

  async createLaporan() {
    (await this.modalCtrl.getTop()).dismiss().then(async () => {
      const modal = await this.modalCtrl.create({
        component: UploadLaporanAgendaComponent,
        componentProps: {
          data: this.detail,
        },
        breakpoints: [0, 1],
        initialBreakpoint: 1,
        cssClass: 'modal-sheet-auto-height',
      });

      await modal.present();
    });
  }
}
