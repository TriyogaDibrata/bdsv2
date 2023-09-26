import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() presentation: string = 'date';
  @Input() value: Date;
  @Input() min: Date;
  @Input() max: Date;

  emptyDate: Date;

  @ViewChild('datetime') datetime: IonDatetime;

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  onValueChanged(ev) {
    console.log(ev);
  }

  confirm() {
    let data = moment(this.value).format('YYYY-MM-DD');
    this.modalCtrl.dismiss(data, 'confirm');
  }

  reset() {
    this.modalCtrl.dismiss('', 'reset');
  }
}
