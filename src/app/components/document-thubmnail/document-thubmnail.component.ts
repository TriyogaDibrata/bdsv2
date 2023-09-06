import { Component, Input, OnInit } from '@angular/core';
import { DocThumb } from '@interfaces/doc-thumb';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-document-thubmnail',
  templateUrl: './document-thubmnail.component.html',
  styleUrls: ['./document-thubmnail.component.scss'],
})
export class DocumentThubmnailComponent implements OnInit {
  @Input() data: DocThumb;
  // @Input() status: number;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    // console.log(this.status);
  }

  convertDate(date) {
    moment.locale('ID');
    return moment(date).format('dddd, DD MMMM YYYY');
  }

  showDetail() {
    this.navCtrl.navigateForward(['detail-doc/', this.data.id]);
  }
}
