import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  @Input() data: any;
  public note: string;
  public passphrase: string;
  public showPassword: boolean = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  doSign() {
    let data = {
      status: this.data.state,
      catatan: this.note,
      passphrase: this.passphrase,
    };
    this.modalCtrl.dismiss(data, 'confirm');
  }
}
