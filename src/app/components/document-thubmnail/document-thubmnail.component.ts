import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-document-thubmnail',
  templateUrl: './document-thubmnail.component.html',
  styleUrls: ['./document-thubmnail.component.scss'],
})
export class DocumentThubmnailComponent implements OnInit {
  @Input() data: any;
  // @Input() status: number;

  constructor() {}

  ngOnInit() {
    // console.log(this.status);
  }

  convertDate(date) {
    moment.locale('ID');
    return moment(date).format('dddd, DD MMMM YYYY');
  }

  showDetail(data) {
    console.log(data);
  }
}
