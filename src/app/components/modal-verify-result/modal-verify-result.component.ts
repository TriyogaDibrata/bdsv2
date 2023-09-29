import { Component, Input, OnInit } from '@angular/core';
import { VerifyResult } from '@interfaces/verify-result';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-verify-result',
  templateUrl: './modal-verify-result.component.html',
  styleUrls: ['./modal-verify-result.component.scss'],
})
export class ModalVerifyResultComponent implements OnInit {
  @Input() data: VerifyResult;

  constructor() {}

  ngOnInit() {}

  convertDate(date) {
    moment.locale('ID');
    return moment(date).format('LLLL');
  }
}
