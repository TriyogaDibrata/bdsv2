import { Component, Input, OnInit } from '@angular/core';
import { DocThumb } from '@interfaces/doc-thumb';
import { Role } from '@interfaces/user';
import { NavController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-document-thubmnail',
  templateUrl: './document-thubmnail.component.html',
  styleUrls: ['./document-thubmnail.component.scss'],
})
export class DocumentThubmnailComponent implements OnInit {
  @Input() data: DocThumb;
  @Input() isNew: boolean = false;
  @Input() role: Role;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
  ) {}

  ngOnInit() {}

  convertDate(date) {
    moment.locale('ID');
    return moment(date).format('dddd, DD MMMM YYYY');
  }

  showDetail() {
    this.navCtrl.navigateForward(['detail-doc/', this.data.id]);
  }
}
