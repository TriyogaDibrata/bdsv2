import { Component, Input, OnInit } from '@angular/core';
import { MailThumb } from '@interfaces/mail-thumb';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-mail-thumbnail',
  templateUrl: './mail-thumbnail.component.html',
  styleUrls: ['./mail-thumbnail.component.scss'],
})
export class MailThumbnailComponent implements OnInit {
  @Input() data: MailThumb;

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
      this.data.inbox_id,
    ]);
  }
}
