import { Component, Input, OnInit } from '@angular/core';
import { AgendaDetailComponent } from '@components/agenda-detail/agenda-detail.component';
import { AgendaSummary } from '@interfaces/agenda';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agenda-summary',
  templateUrl: './agenda-summary.component.html',
  styleUrls: ['./agenda-summary.component.scss'],
})
export class AgendaSummaryComponent implements OnInit {
  @Input() data: AgendaSummary;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  public async showDetail(id: number) {
    const modal = await this.modalCtrl.create({
      component: AgendaDetailComponent,
      componentProps: {
        id: id,
      },
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();
  }
}
