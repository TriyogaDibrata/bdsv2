import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent implements OnInit {
  @Input() status: string;
  @Input() autoClose: boolean;
  @Input() duration: number;
  @Input() showConfirmButton: boolean;
  @Input() title: string;
  @Input() text: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.autoClose) {
      setTimeout(() => {
        this.dismissModal();
      }, this.duration);
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
