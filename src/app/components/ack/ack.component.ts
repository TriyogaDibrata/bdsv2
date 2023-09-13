import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ack',
  templateUrl: './ack.component.html',
  styleUrls: ['./ack.component.scss'],
})
export class AckComponent implements OnInit {
  @Input() data: any;
  public note: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.data);
  }

  doAck() {
    let data = {
      status: this.data.state,
      catatan: this.note,
    };
    this.modalCtrl.dismiss(data, 'confirm');
  }
}
