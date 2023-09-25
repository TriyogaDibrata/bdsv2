import { Component, Input, OnInit } from '@angular/core';
import { SentThumb } from '@interfaces/sent-thumb';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-sent-thumbnail',
  templateUrl: './sent-thumbnail.component.html',
  styleUrls: ['./sent-thumbnail.component.scss'],
})
export class SentThumbnailComponent implements OnInit {
  @Input() data: SentThumb;

  public status: any = {
    '-4': {
      nama: 'Tolak Persetujuan Nomor Surat',
      color: 'primary',
    },
    '-3': {
      nama: 'Surat Ditarik dan Diperbaiki',
      color: 'primary',
    },
    '-2': {
      nama: 'Pengembalian Surat',
      color: 'primary',
    },
    '-1': {
      nama: 'Dihapus',
      color: 'primary',
    },
    '0': {
      nama: 'Draft Surat / Surat Baru',
      color: 'primary',
    },
    '1': {
      nama: 'Surat Final',
      color: 'warning',
    },
    '2': {
      nama: 'Terkirim / Selesai',
      color: 'success',
    },
    '3': {
      nama: 'Persetujuan & TTE',
      color: 'secondary',
    },
    '4': {
      nama: 'Draft Pengajuan Nomor Surat',
      color: 'secondary',
    },
    '5': {
      nama: 'Persetujuan & TTE (Surat Nomor Luar Dinas)',
      color: 'Success',
    },
    '6': {
      nama: 'Persetujuan Permohonan Nomor Surat',
      color: 'Success',
    },
  };

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  convertDate(date) {
    moment.locale('ID');
    return moment(date).format('DD/MM/YYYY');
  }

  showDetail() {
    this.navCtrl.navigateForward([
      'detail-mail/',
      this.data.surat_id,
      'outbox',
    ]);
  }
}
